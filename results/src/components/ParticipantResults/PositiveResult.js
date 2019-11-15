import React, { useContext, createContext } from 'react';

import { contentContext } from './Results';
import * as positiveResults from './PositiveResults';
import { STabs, STabList, STab, STabPanel } from '../styledComponents';

// Set up tabsRole for react-tabs
STabList.tabsRole = 'TabList';
STab.tabsRole = 'Tab';
STabPanel.tabsRole = 'TabPanel';

function matchResultComponent(content){
    const ResultComponent = positiveResults[content.id];
    return <ResultComponent/>
}

export const positiveResultContext = createContext();
export default function PositiveResult() {
    const { resultContent } = useContext(contentContext)

    const resultTabs = resultContent.map((content) =>
        <STab key={content.id}>{content.id}</STab>
    );

    const resultPanels = resultContent.map((content) =>
        <positiveResultContext.Provider key={content.id} value={{ content }}>
            <STabPanel>
                {matchResultComponent(content)}
            </STabPanel>
        </positiveResultContext.Provider>
    );

    return (
        <div>
            <h3 className='align-center'>
                {resultContent[0].title} <br/>
            </h3>
            <STabs
                selectedTabClassName='is-selected'
                selectedTabPanelClassName='is-selected'>
                <STabList>
                    {resultTabs}
                </STabList>
                {resultPanels}
            </STabs>
        </div>
    )
}
