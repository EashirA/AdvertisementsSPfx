import * as React from 'react';
import { IEditProps, IEditState, IListItems } from '../Interfaces/IAdsWebPartInterfaces';
import { DatePicker, TextField, PrimaryButton, Image, Dropdown, Dialog, DialogType, DialogFooter, 
    DefaultButton, getId, Text, Modal, Stack, SearchBox } from 'office-ui-fabric-react';
import styles from '../Styles/AdsWebPart.module.scss';

export default class Edit extends React.Component<IEditProps, IEditState> {
    private _labelId: string = getId('dialogLabel');
    private _subTextId: string = getId('subTextLabel');
    private _titleId: string = getId('title');
    private _subtitleId: string = getId('subText');
    private _updateTitleId: string = getId('title');
    private _updateSubtitleId: string = getId('subText');

    constructor(props: IEditProps, state: IEditState) {
        super(props);

        this.state = {
            hiddenUpdateDialog: true,
            hiddenDeleteDialog: true,
            showModal: false,
            showUpdateModal: false,
            searchValue: '',
            updateId: '',
            titleVal: '',
            decsVal: '',
            priceVal: '',
            dateVal: null,
            catVal: { Category0: '' },
            imgVal: '',
            deleteId: '',
        };
    }


    public componentDidMount() {
        this.props.getAllItems();
    }

    private _closeUpdateDialog = (): void => {
        this.setState({ hiddenUpdateDialog: true });
    }
    private _closeDeleteDialog = (): void => {
        this.setState({ hiddenDeleteDialog: true });
    }

    private _closeModal = (): void => {
        this.setState({ showModal: false });
    }

    private _closeUpdateModal = (): void => {
        this.setState({ showUpdateModal: false });
    }

    private setValue = (val: any): void => {
        this.setState({ catVal: val.text });
    }

    public render(): React.ReactElement<IEditProps> {

        const stackTokens = {
            linearStack: { childrenGap: 20 },
            sectionStack: { childrenGap: 10 },
            headingStack: { childrenGap: 10 }
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

                            <Stack horizontal tokens={stackTokens.linearStack}>
                                <Stack grow={1} >
                                    <PrimaryButton text='Update'
                                        className={styles.button}
                                        onClick={() => this.setState({ showUpdateModal: true })} />
                                </Stack>
                                <Stack grow={1} >
                                    <PrimaryButton text='Delete'
                                        className={styles.button}
                                        onClick={() => this.setState({ hiddenDeleteDialog: false })} />
                                </Stack>
                                <Stack grow={1}>
                                    <PrimaryButton
                                        text='Close'
                                        className={styles.button}
                                        onClick={this._closeModal} />
                                </Stack>
                            </Stack>
                            <br/><br/><br/>

                            <Modal
                                titleAriaId={this._updateTitleId}
                                subtitleAriaId={this._updateSubtitleId}
                                isOpen={this.state.showUpdateModal}
                                onDismiss={this._closeUpdateModal}
                                isBlocking={true}
                                containerClassName={styles.container}>
                                <div className={styles.adsWebPart} >
                                    <div id={this._updateSubtitleId} className={styles.body}>
                                        <Stack tokens={stackTokens.sectionStack}>
                                            <Stack tokens={stackTokens.headingStack}>
                                                <TextField
                                                    label="Product Id "
                                                    value={i.Id}
                                                    disabled
                                                />
                                                <TextField
                                                    label="Title"
                                                    placeholder={i.Title}
                                                    onChanged={e => this.setState({ titleVal: e })}
                                                    required
                                                />
                                                <TextField
                                                    label="Description"
                                                    multiline rows={3}
                                                    placeholder={i.Description}
                                                    onChanged={e => this.setState({ decsVal: e })}

                                                />
                                                <TextField
                                                    label="Price"
                                                    placeholder={String(i.Price)}
                                                    onChanged={e => this.setState({ priceVal: e })}
                                                    required
                                                />

                                                <DatePicker label="Date" placeholder={String(i.Date).slice(0, 10)} strings={this.props._dayPickerStrings} onSelectDate={e => this.setState({ dateVal: e })} />

                                                <Dropdown
                                                    label="Category"
                                                    defaultValue={i.Category0}
                                                    options={this.props._options}
                                                    onChanged={e => this.setValue(e)}
                                                    required
                                                />
                                                <TextField
                                                    label="Image"
                                                    placeholder={i.Image.Url}
                                                    onChanged={e => this.setState({ imgVal: e })}
                                                    required
                                                />
                                                {(this.state.imgVal == '')
                                                    ?
                                                    (<Image src={i.Image.Url} style={{ width: '520px' }} />)
                                                    :
                                                    (<Image src={this.state.imgVal} style={{ width: '520px' }} />)
                                                }
                                            </Stack>
                                        </Stack>
                                        <br /><br />
                                        <Stack horizontal tokens={stackTokens.linearStack}>
                                            <Stack grow={1} >
                                                <PrimaryButton text='Update' className={styles.button}
                                                    onClick={() => this.setState({ hiddenUpdateDialog: false })} />
                                            </Stack>
                                            <Stack grow={1}>
                                                <PrimaryButton
                                                    text='Cancel' className={styles.button}
                                                    onClick={this._closeUpdateModal} />
                                            </Stack>
                                        </Stack>
                                        <br /><br /><br />
                                    </div>
                                </div>
                            </Modal>


                            <Dialog
                                hidden={this.state.hiddenUpdateDialog}
                                onDismiss={this._closeUpdateDialog}
                                dialogContentProps={{
                                    type: DialogType.normal,
                                    title: 'Are you sure to Update?',
                                }}
                                modalProps={{
                                    titleAriaId: this._labelId,
                                    subtitleAriaId: this._subTextId,
                                    isBlocking: true,
                                    styles: { main: { maxWidth: 450 } }
                                }}
                            >
                                <DialogFooter>
                                    <PrimaryButton text="Update"
                                        className={styles.button}
                                        onClick={() =>
                                            this.props.updateItem(
                                                i.Id,
                                                this.state.titleVal,
                                                this.state.decsVal,
                                                this.state.priceVal,
                                                this.state.dateVal,
                                                this.state.catVal,
                                                this.state.imgVal,
                                                this._closeUpdateDialog(),
                                                this._closeUpdateModal(),
                                                this._closeModal(),
                                            )}
                                    />
                                    <DefaultButton text="No"
                                        className={styles.button}
                                        onClick={() => this._closeUpdateDialog()} />
                                </DialogFooter>
                            </Dialog>

                            <Dialog
                                hidden={this.state.hiddenDeleteDialog}
                                onDismiss={this._closeDeleteDialog}
                                dialogContentProps={{
                                    type: DialogType.normal,
                                    title: 'Are you sure to Delete?',
                                }}
                                modalProps={{
                                    titleAriaId: this._labelId,
                                    subtitleAriaId: this._subTextId,
                                    isBlocking: true,
                                    styles: { main: { maxWidth: 450 } }
                                }}
                            >
                                <DialogFooter>
                                    <PrimaryButton text="Delete"
                                        className={styles.button}
                                        onClick={() =>
                                            this.props.deleteItem(
                                                i.Id,
                                                this._closeDeleteDialog(),
                                                this._closeModal()
                                            )}
                                    />
                                    <DefaultButton text="No"
                                        className={styles.button}
                                        onClick={() => this._closeDeleteDialog()} />
                                </DialogFooter>
                            </Dialog>
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
                    <SearchBox
                        placeholder="Search item to edit "
                        value={this.state.searchValue}
                        onChanged={e => this.setState({ searchValue: e })}
                        onSearch={() => this.props.searchItems(this.state.searchValue, this.state.catVal.Category0)}
                    />
                </div>
                <br />
                <br />
                <div>
                    <div className={styles.searchCard}>
                        <table style={{ width: '100%' }}>
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

