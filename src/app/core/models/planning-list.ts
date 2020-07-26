export interface PlanningDataModel {
  title: string;
  description: string;
  status: 'done' | 'expired' | 'placed';
  date: string;
  place: string;
  address: string;
  edit?: boolean;
}
