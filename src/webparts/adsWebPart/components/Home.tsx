import * as React from 'react';
import { PrimaryButton, Image } from 'office-ui-fabric-react';
import { IListItems, IHomeProps } from '../Interfaces/IAdsWebPartInterfaces';
import styles from '../Styles/AdsWebPart.module.scss';

export default class Home extends React.Component<IHomeProps, {}> {
    public render(): React.ReactElement<IHomeProps> {
        let values: JSX.Element[] = this.props.items.map((item: IListItems) => {
            return (
                <>
                    <div className={styles.cards}>
                        <h2 style={{ color: 'red' }}> {item.Title}</h2>
                        <h6>{item.Description}</h6>
                        <h4><b>{item.Price} Kr</b></h4>
                        <h4>{String(item.Date).slice(0, 10)}</h4>
                        <h4>{item.Author.Title}</h4>
                        <h4>{item.Category0}</h4>
                        <Image
                            src={item.Image.Url}
                            style={{ width: '260px', height: '300px', display: 'inline' }}
                        />
                    </div>
                </>);
        });
        return (
            <>
                <div style={{ listStyle: 'none' }}>
                    <br /><br />
                    <ul>
                        <div  >
                            {values}
                        </div>
                    </ul>
                    <br /><br />
                    <PrimaryButton text='Get All'
                        className={styles.button}
                        onClick={this.props.getAllItems} /><br /><br />
                </div>
            </>
        );
    }
}
