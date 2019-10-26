import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AdsWebPartWebPartStrings';
import AdsWebPart from './components/AdsWebPart';
import { IAdsWebPartProps } from './Interfaces/IAdsWebPartInterfaces';
import { setup as pnpSetup } from '@pnp/common';


export interface IAdsWebPartWebPartProps {
  description: string;
}

export default class AdsWebPartWebPart extends BaseClientSideWebPart<IAdsWebPartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAdsWebPartProps > = React.createElement(
      AdsWebPart,
      {
        description: this.properties.description,
        DisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  public onInit(): Promise<void> {
    pnpSetup({
      spfxContext: this.context
    });
    return Promise.resolve();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
