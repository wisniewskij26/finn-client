import * as React from 'react';
import Button from './Button';
import Icon from './Icon';
import IconButton from './IconButton';
import Input from './Input';
import MobileMenuToggle from './MobileMenuToggle';

class MobileMenu extends React.Component {
  public render() {
    return (
      <MobileMenuToggle>
        {({ hide }) => (
          <>
            <div onClick={hide} className="MobileMenu__overlay" />
            <div className="MobileMenu">
              <div className="MobileMenu__top">
                <IconButton dataTestID="hide-menu" onClick={hide} theme="secondary" type="text">
                  <IconButton.Icon icon="arrow-left" prefix="solid" />
                </IconButton>
              </div>
              <div className="MobileMenu__links">
                <Input fullWidth iconLeft={() => <Icon icon="search" />} placeholder="Search" />
              </div>
              <div className="MobileMenu__auth-buttons">
                <Button fullWidth type="outline">
                  Sign In
                </Button>
                <Button fullWidth>Sign Up</Button>
              </div>
            </div>
          </>
        )}
      </MobileMenuToggle>
    );
  }
}

export default MobileMenu;
