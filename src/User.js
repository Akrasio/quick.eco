class User {
    
    constructor(id, guild, database) {
        this.id = id;
        if (guild && typeof guild == "string") this.guild = guild;
        if (guild && typeof guild !== "string" && !database) this.db = guild;
        this.db = database;
    }

    /**
      * Balance of the user
      * @type Number
      * @returns {Balance}
      */
    static get balance() {
        if (!this.db) throw new Error("Partial users may not have balance");
        if (this.guild) {
            let i = this.db.get(`money_${this.guild}_${this.id}`)
            return (i || 0);
        }
        return (this.db.get(`money_${this.id}`) || 0);
    }

    /**
      * create mention
      * @type String
      * @returns String
      */
    static toString() {
        return `<@${this.id}>`;
    }

    /**
      * parses everything related to user
      * @returns data[]
      */
    static parseAll() {
        if (!this.db) throw new Error("Partial users may not have balance.");
        let data = this.db.all().filter(i => i.ID.includes(this.id));
        return data ? (data.length ? data : []): [];
    }
}

module.exports = User;
