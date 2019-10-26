import * as React from 'react';
import { SearchBox, Dropdown, Stack, PrimaryButton, getId, Modal, Text, Image, Icon } from 'office-ui-fabric-react';
import { IListItems, ISearchProps, ISearchState } from '../Interfaces/IAdsWebPartInterfaces';
import styles from '../Styles/AdsWebPart.module.scss';


export default class Search extends React.Component<ISearchProps, ISearchState> {
    private _titleId: string = getId('title');
    private _subtitleId: string = getId('subText');

    constructor(props: ISearchProps, state: ISearchState) {
        super(props);

        this.state = {
            showModal: false,
            searchValue: '',
            categoryValue: '',
            sort: false,
        };
    }

    private _closeModal = (): void => {
        this.setState({ showModal: false });
    }

    private sort = () => {
        this.setState({
            sort: !this.state.sort
        });
        this.state.sort === true ? (
            this.props.searcResult.sort((a, b) => { return (a.Price - b.Price); })
        ) : (
                this.props.searcResult.sort((a, b) => { return (b.Price - a.Price); })
            );
    }

    private setValue = (val: any): void => {
        console.log(val.text);
        if (val.text === 'All') {
            this.setState({ categoryValue: '' });
        }
        else if (val.text === 'Antique' || 'Car' || 'Computer' || 'Mobile' || 'Tv') {
            this.setState({ categoryValue: val.text });
        }
    }

    public render(): React.ReactElement<ISearchProps> {
        const stackTokens = {
            linearStack: { childrenGap: 20 },
            sectionStack: { childrenGap: 10 },
            headingStack: { childrenGap: 5 }
        };

        let titleValues: JSX.Element[] = this.props.items.map((i: IListItems) => {
            return (<div>
                <Modal
                    titleAriaId={this._titleId}
                    subtitleAriaId={this._subtitleId}
                    isOpen={this.state.showModal}
                    onDismiss={this._closeModal}
                    isBlocking={true}
                    containerClassName={styles.container}>
                    <div className={styles.adsWebPart}>
                        <div id={this._subtitleId} className={styles.body}>
                            <Stack tokens={stackTokens.sectionStack}>
                                <Stack tokens={stackTokens.headingStack}>
                                    <h1 className={styles.header} id={this._titleId}>{i.Title}</h1>
                                    <Text><strong>Author: </strong>{i.Author.Title}</Text>
                                    <Text><strong>Description: </strong>{i.Description}</Text>
                                    <Text><strong>Price: </strong>{i.Price}</Text>
                                    <Text><strong>Date: </strong>{String(i.Date).slice(0, 10)}</Text>
                                    <Text><strong>Category: </strong>{i.Category0}</Text>
                                    <Image src={i.Image.Url} style={{ maxWidth: '500px', maxHeight: '660px' }} />
                                </Stack>
                            </Stack>
                            <br /><br />
                            <PrimaryButton
                                text='Close'
                                className={styles.button}
                                onClick={this._closeModal} />
                        </div>
                    </div>
                </Modal>
            </div>);
        });

        let values: JSX.Element[] = this.props.searcResult.map((item: IListItems) => {
            return (<>
                <tr>
                    <td>{item.Title}</td>
                    <td>{item.Price}</td>
                    <td>{item.Category0}</td>
                    <td>
                        <PrimaryButton text='Detail' className={styles.button}
                            onClick={() => this.props.getSingleItem(item.Title, this.setState({ showModal: true }))} />
                    </td>
                </tr>
            </>);
        });
        return (
            <>
                <div>
                    <br /><br />
                    <Stack horizontal tokens={stackTokens.linearStack}>
                        <Stack grow={1.5} >
                            <Dropdown
                                options={this.props._searchOptions}
                                onChanged={e => this.setValue(e)}
                                placeHolder='All'
                            />
                        </Stack>
                        <Stack grow={3}>
                            <SearchBox
                                placeholder="Search"
                                value={this.state.searchValue}
                                onChanged={e => this.setState({ searchValue: e })}
                                onSearch={() => this.props.searchItems(this.state.searchValue, this.state.categoryValue)}
                            />
                        </Stack>
                    </Stack>
                </div>
                <br />
                <br />
                <PrimaryButton onClick={this.sort}>Sort &nbsp; <Icon iconName="Sort" /> </PrimaryButton>
                <br />
                <br />
                <div>
                    <div className={styles.searchCard}>
                        <table style={{width:'100%'}}>
                            <thead>
                                <tr>
                                    <th><strong>Title</strong></th> <th><strong>Price</strong></th> <th><strong>Category</strong></th> <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {values}
                            </tbody>
                        </table>
                    </div>
                    {titleValues}
                </div>
            </>
        );
    }
}