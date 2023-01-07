export class CovidInfo {
    cases: number = 0;
    tests: number = 0;
    hospitalization: number = 0;
    deaths: number = 0;
    date?: string;

    constructor(obj?: CovidInfo) {
        if (obj) {
            this.update(obj);
        }
    }

    public update(obj: CovidInfo): void {
        this.cases = obj.cases;
        this.tests = obj.tests;
        this.hospitalization = obj.hospitalization;
        this.deaths = obj.deaths;
        this.date = obj.date;
    }

    static fromDTO(item: any): CovidInfo {
        let newItem: CovidInfo = new CovidInfo();
        newItem.cases = item.cases.total;
        newItem.tests = item.testing.total;
        newItem.hospitalization = item.outcomes.hospitalized.currently;
        newItem.deaths = item.outcomes.death.total;
        newItem.date = item.date;

        return newItem;
    }
}

export interface ICovidInfoQueryArgs {
    date: string;
}