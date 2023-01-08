export class State {
    name!: string;
    code!: string;

    constructor(obj?: State) {
        if (obj) {
            this.update(obj);
        }
    }

    public update(obj: State): void {
        this.name = obj.name;
        this.code = obj.code;
    }

    static fromDTO(item: any): State {
        let newItem: State = new State();
        newItem.name = item.name;
        newItem.code = item.state_code.toLowerCase();

        return newItem;
    }
}