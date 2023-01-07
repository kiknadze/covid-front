export type OverviewDataKey = 'cases' | 'tests' | 'hospitalization' | 'deaths';

export interface IOverviewItems {
  title: string;
  icon: string;
  key: OverviewDataKey;
}

export const OVERVIEW_ITEMS: IOverviewItems[] = [
    {
        title: 'Cases',
        icon: 'bug_report',
        key: 'cases'
    },
    {
        title: 'Tests',
        icon: 'receipt',
        key: 'tests'
    },
    {
        title: 'Hospitalization',
        icon: 'local_hotel',
        key: 'hospitalization'
    },
    {
        title: 'Deaths',
        icon: 'accessibility',
        key: 'deaths'
    }
];