import React from 'react';
import { Spin } from 'antd';

const LoadingScreen = (props) => {
  const {isLoading}=props;
  return (
    isLoading?
    <div style={styles.centered}>
      <Spin tip="Loading...">
      </Spin>,
    </div>:
    null
  )
}

const styles = {
  centered: { 
    position: 'fixed', 
    top: '0', 
    left: '0', 
    height: '100%', 
    width: '100%', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff',
    zIndex: 999999,
  }
}

export default LoadingScreen;