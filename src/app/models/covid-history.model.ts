import { CovidInfo } from "./covid.model";

export class CovidHistory extends CovidInfo {

    static override fromDTO(item: any): CovidHistory {
        let newItem: CovidHistory = new CovidHistory();
        newItem.cases = item.cases.total.value;
        newItem.tests = item.testing.total.value;
        newItem.hospitalization = item.outcomes.hospitalized.currently.value;
        newItem.deaths = item.outcomes.death.total.value;
        newItem.date = item.date;

        return newItem;
    }
}