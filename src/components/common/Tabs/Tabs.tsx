import styles from './Tabs.module.css';

import React, { ReactElement, useState } from 'react';
import { TabTitle, TabTitleProps } from 'components/common/Tabs/TabTitle';

interface TabsProps {
  children: Array<ReactElement<TabTitleProps>>;
}

export function Tabs({ children }: TabsProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={styles.root}>
      <ul className={styles.titles}>
        {children.map((tab, index) => (
          <TabTitle
            key={index}
            label={tab.props.label}
            index={index}
            setSelectedTab={setSelectedTab}
            active={selectedTab === index}
            disabled={tab.props.disabled}
          />
        ))}
      </ul>
      <div className={styles.content}>
        {children[selectedTab]}
      </div>
    </div>
  );
}
