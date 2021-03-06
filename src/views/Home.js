import React from 'react';
import Auth from '../components/Auth';
import HomeComponent from '../components/HomeComponent';

export default function Home({ user }) {
  const loadComponent = () => {
    let component = '';
    if (user) {
      component = <HomeComponent />;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return (
        <div>
                {loadComponent()}
        </div>
  );
}
