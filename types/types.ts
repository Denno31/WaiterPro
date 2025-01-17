export interface Bill {
  waiterName: string;
  tableNo: number | string;
  salePoint: string;
}
export type ItemGroup = {
  itemGroup: string;
  id: number;
};

export type ItemSourceWithGroups = {
  itemSource: string;
  id: number;
  groups: ItemGroup[];
};

export type Item = {
  id: number;
  name: string;
  price: number;
};
