import { CovidHistory } from "./covid-history.model";

export class CovidState extends CovidHistory {

    static override fromDTO(item: any): CovidState {
        let newItem: CovidState = new CovidState();
        newItem.cases = item.cases.total;
        newItem.tests = item.tests.pcr.total;
        newItem.hospitalization = item.outcomes.hospitalized.currently;
        newItem.deaths = item.outcomes.death.total;
        newItem.date = item.date;

        return newItem;
    }
}