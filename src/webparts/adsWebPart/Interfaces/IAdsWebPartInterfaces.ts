
//WebPart
export interface IAdsWebPartProps {
  description: string;
  DisplayName: string;
}

export interface IAdsWebPartStates {
  items: IListItems[];
  searcResult: IListItems[];
}

//Home
export interface IHomeProps {
  items: IListItems[];
  getAllItems: any;
}

//Add
export interface IAddNewProps {
  addNewItem: any;
  _dayPickerStrings: any;
  _options: any;

}

export interface IAddNewState {
  showModal: boolean;
  titleVal: string;
  decsVal: string;
  priceVal: string;
  dateVal: Date;
  imgVal: string;
  catVal: { Category0: string };

}

//Edit
export interface IEditProps {
  //items: IListItems[];
  name: string;
  getAllItems: any;
  updateItem: any;
  deleteItem: any;
  _dayPickerStrings: any;
  _options: any;
  searchItems: any;
  getSingleItem: any;
  _searchOptions: any;
  searcResult: IListItems[];
  items: IListItems[];

}

export interface IEditState {
  hiddenUpdateDialog: boolean;
  hiddenDeleteDialog: boolean;
  showModal: boolean;
  showUpdateModal: boolean;
  searchValue: string;
  updateId: string;
  titleVal: string;
  decsVal: string;
  priceVal: string;
  dateVal: Date;
  catVal: { Category0: string };
  imgVal: string;
  deleteId: string;

}

//Search
export interface ISearchProps {
  searchItems: any;
  getSingleItem: any;
  _searchOptions: any;
  searcResult: IListItems[];
  items: IListItems[];
}

export interface ISearchState {
  showModal: boolean;
  searchValue: string;
  categoryValue: string;
  sort: boolean;
}

//List
export interface IListItems {
  Id: string;
  Title: string;
  Description: string;
  Price: number;
  Date: Date;
  Category0: string;
  Author: {
    Title: string
  };
  Image: {
    Url: string
  };
}



