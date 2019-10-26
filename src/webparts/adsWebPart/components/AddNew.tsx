import * as React from 'react';
import styles from '../Styles/AdsWebPart.module.scss';
import { IAddNewProps, IAddNewState } from '../Interfaces/IAdsWebPartInterfaces';
import { DatePicker, TextField, PrimaryButton, Image, Dropdown, Modal, Stack, Text, getId } from 'office-ui-fabric-react';


export default class AddNew extends React.Component<IAddNewProps, IAddNewState> {
    private _titleId: string = getId('title');
    private _subtitleId: string = getId('subText');

    constructor(props: IAddNewProps, state: IAddNewState) {
        super(props);

        this.state = {
            showModal: false,
            titleVal: '',
            decsVal: '',
            priceVal: '',
            dateVal: null,
            catVal: { Category0: '' },
            imgVal: '',
        };
    }

    private _closeModal = (): void => {
        this.setState({ showModal: false });
    }

    private setValue = (val: any): void => {
        this.setState({ catVal: val.text });
    }

    public render(): React.ReactElement<IAddNewProps> {
        const tokens = {
            sectionStack: { childrenGap: 10 },
            headingStack: { childrenGap: 5 }
        };

        return (
            <div>
                <form  >
                    <fieldset>
                        <legend style={{ fontSize: '25px' }}> Add your Advertise here </legend>
                        <TextField
                            label="Title"
                            value={this.state.titleVal}
                            onChanged={e => this.setState({ titleVal: e })}
                            required
                        />
                        <TextField
                            label="Description"
                            multiline rows={5}
                            value={this.state.decsVal}
                            onChanged={(e: string) => this.setState({ decsVal: e })}
                        />
                        <TextField
                            label="Price"
                            value={this.state.priceVal}
                            onChanged={e => this.setState({ priceVal: e })}
                            required
                        />
                        <DatePicker
                            label="Date"
                            strings={this.props._dayPickerStrings}
                            onSelectDate={e => this.setState({ dateVal: e })}
                        />
                        <Dropdown
                            label="Choose a Category"
                            options={this.props._options}
                            onChanged={e => this.setState({catVal: { Category0: e.text }})}
                            required
                        />
                        <TextField
                            label="Image Link"
                            value={this.state.imgVal}
                            onChanged={e => this.setState({ imgVal: e })}
                            required
                        />
                        <Image
                            src={this.state.imgVal}
                            alt="An antique paint."
                            style={{ width: '520px' }}
                        />

                        <br /><br />
                        <PrimaryButton text='Add Item'
                            className={styles.button}
                            onClick={() =>
                                this.props.addNewItem(
                                    this.state.titleVal,
                                    this.state.decsVal,
                                    this.state.priceVal,
                                    this.state.dateVal,
                                    this.state.catVal,
                                    this.state.imgVal,
                                    this.setState({ showModal: true }),
                                )}
                        />
                    </fieldset>
                </form>

                <Modal
                    titleAriaId={this._titleId}
                    subtitleAriaId={this._subtitleId}
                    isOpen={this.state.showModal}
                    onDismiss={this._closeModal}
                    isBlocking={true}
                    containerClassName={styles.container}>
                    <div className={styles.adsWebPart}>
                        <div id={this._subtitleId} className={styles.body}>
                            <Stack tokens={tokens.sectionStack}>
                                <Stack tokens={tokens.headingStack}>
                                    <h1 className={styles.header} id={this._titleId}>{this.state.titleVal}</h1>
                                    <Text><strong>Description: </strong>{this.state.decsVal}</Text>
                                    <Text><strong>Price: </strong>{this.state.priceVal} Kr</Text>
                                    <Text><strong>Date: </strong>{String(this.state.dateVal).slice(0, 10)}</Text>
                                    <Text><strong>Category: </strong>{this.state.catVal}</Text>
                                    <Image src={this.state.imgVal} style={{ width: '520px' }} />
                                </Stack>
                            </Stack>
                            <br/><br/>
                            <PrimaryButton
                                text='Close'
                                className={styles.button}
                                onClick={this._closeModal
                                } />
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

