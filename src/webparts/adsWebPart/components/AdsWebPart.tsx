import * as React from 'react';
import styles from '../Styles/AdsWebPart.module.scss';
import { IAdsWebPartProps, IAdsWebPartStates, IListItems } from '../Interfaces/IAdsWebPartInterfaces';
import { sp } from '@pnp/sp';
import { Pivot, PivotItem, PivotLinkSize, IDatePickerStrings, IDropdownOption } from 'office-ui-fabric-react';

import Home from './Home';
import AddNew from './AddNew';
import Edit from './Edit';
import Search from './Search';


export default class AdsWebPart extends React.Component<IAdsWebPartProps, IAdsWebPartStates> {
  private _dayPickerStrings: IDatePickerStrings;
  private _options: IDropdownOption[];
  private _searchOptions: IDropdownOption[];

  constructor(props: IAdsWebPartProps, state: IAdsWebPartStates) {
    super(props);

    this.state = {
      items: [],
      searcResult: [],
    };

    this._dayPickerStrings = {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

      goToToday: 'Go to today',
      prevMonthAriaLabel: 'Go to previous month',
      nextMonthAriaLabel: 'Go to next month',
      prevYearAriaLabel: 'Go to previous year',
      nextYearAriaLabel: 'Go to next year'
    };

    this._options = [
      { key: '1', text: 'Antique' },
      { key: '2', text: 'Car' },
      { key: '3', text: 'Computer' },
      { key: '4', text: 'Mobile' },
      { key: '5', text: 'Tv' },
    ];

    this._searchOptions = [
      { key: '1', text: 'All' },
      { key: '2', text: 'Antique' },
      { key: '3', text: 'Car' },
      { key: '4', text: 'Computer' },
      { key: '5', text: 'Mobile' },
      { key: '6', text: 'Tv' },
    ];
  }

  componentDidMount(){
    this.getAllItems();
  }

  public getAllItems = (): void => {
    sp.web.lists.getByTitle("Advertisements").items
      .select('Title', 'Description', 'Price', 'Date', 'Author/Title', 'Category0', 'Image', 'Id')
      .expand('Author')
      .orderBy('Title', true)
      .getAll()
      .then((result: IListItems[]) => {
        console.log(result);
        this.setState({ items: result });
      });
  }



  public addNew = (title: string, description: string, price: string, date: any, category: string, image: string): void => {
    sp.web.lists.getByTitle("Advertisements").items
      .add(
        {
          Title: title,
          Description: description,
          Price: parseInt(price),
          Date: date,
          Category0: category,
          Image: {
            Url: image
          }
        }
      );
  }

  public updateItem = (id: number, title: string, description: string, price: string, date: any, category: string, image: string): void => {
    console.log(date);
    sp.web.lists.getByTitle("Advertisements").items
      .getById(id)
      .update(
        {
          Title: title,
          Description: description,
          Price: parseInt(price),
          Date: date,
          Category0: category,
          Image: {
            Url: image
          }
        }
      );
  }

  public deleteItem = (id: string): void => {
    sp.web.lists.getByTitle("Advertisements").items
      .getById(parseInt(id))
      .delete();
  }


  public searchItems = (searchval: string, catVal: string): void => {
    if (catVal === '') {
      sp.web.lists.getByTitle("Advertisements").items
        .filter("substringof('" + searchval + "', Title)")
        .select('Title', 'Price', 'Category0')
        .top(15)
        .orderBy('Title', true)
        .get()
        .then((result: IListItems[]) => {
          this.setState({ searcResult: result });
        });
    } else {
      sp.web.lists.getByTitle("Advertisements").items
        .filter("substringof('" + searchval + "', Title) and substringof('" + catVal + "', Category0) ")
        .select('Title', 'Price', 'Category0')
        .top(10)
        .orderBy('Title', true)
        .get()
        .then((result: IListItems[]) => {
          this.setState({ searcResult: result });
        });
    }
  }

  public getSingleItem = (itemTitle: string): void => {
    sp.web.lists.getByTitle("Advertisements").items
      .filter("substringof('" + itemTitle + "', Title)")
      .select('Title', 'Description', 'Price', 'Date', 'Author/Title', 'Category0', 'Image','ID')
      .expand('Author')
      .orderBy('Title', true)
      .get()
      .then((result: IListItems[]) => {
        this.setState({ items: result });
      });
  }

  public render(): React.ReactElement<IAdsWebPartProps> {
    return (
      <div className={styles.adsWebPart} >
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <h3 className={styles.title}> ~ Advertisement ~</h3>
              <div >
                <fieldset style={{ minHeight: '660px' }}>
                  <Pivot linkSize={PivotLinkSize.large} >
                    <PivotItem className={styles.label} itemIcon='HomeSolid' headerText='Home' headerButtonProps={{ 'data-order': 1, 'data-title': 'First' }}>
                      <Home items={this.state.items} getAllItems={this.getAllItems} />
                    </PivotItem>

                    <PivotItem headerText="Add New" itemIcon='CircleAdditionSolid'>
                      <AddNew addNewItem={this.addNew} _options={this._options} _dayPickerStrings={this._dayPickerStrings} />
                    </PivotItem>
                    <PivotItem headerText="Edit" itemIcon='Settings'>
                      <Edit name={this.props.DisplayName} getAllItems={this.getAllItems} updateItem={this.updateItem} deleteItem={this.deleteItem} _options={this._options}
                        _dayPickerStrings={this._dayPickerStrings} searchItems={this.searchItems} _searchOptions={this._searchOptions} getSingleItem={this.getSingleItem} searcResult={this.state.searcResult}
                        items={this.state.items} />
                    </PivotItem>

                    <PivotItem headerText="Search" itemIcon='Search'>
                      <Search searchItems={this.searchItems} _searchOptions={this._searchOptions} getSingleItem={this.getSingleItem} searcResult={this.state.searcResult} items={this.state.items} />
                    </PivotItem>
                  </Pivot>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
