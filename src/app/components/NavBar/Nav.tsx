import * as React from 'react';
import {
  IconBulb,
  IconHeartFilled,
  IconMenu2,
  IconX,
} from '@tabler/icons-react';
import { ThemeSwitch } from 'app/pages/HomePage/Features/ThemeSwitch';
import styled from 'styled-components/macro';
import { ReactComponent as TwitterIcon } from './assets/twitter.svg';
import { useMediaQuery } from 'react-responsive';
import { Overlay } from '../Overlay/Overlay';

export function Nav() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (isTabletOrMobile) {
    return (
      <MobileWrapper>
        {menuOpen ? (
          // TODO: MAKE THESE WORK WITH DARK MODE
          <IconX onClick={toggleMenu} size={24} />
        ) : (
          <IconMenu2 onClick={toggleMenu} size={24} />
        )}
        {isTabletOrMobile && <Overlay isOpened={menuOpen} />}
      </MobileWrapper>
    );
  }

  return (
    <Wrapper>
      <ThemeSwitch />
      <Item
        href="https://twitter.com/turbogpt"
        target="_blank"
        title="Twitter Page"
        rel="noopener noreferrer"
      >
        SDP Repo
      </Item>
      <Item
        href="https://twitter.com/turbogpt"
        target="_blank"
        title="Twitter Page"
        rel="noopener noreferrer"
      >
        ZTP Repo
      </Item>
      <Item
        href="https://twitter.com/turbogpt"
        target="_blank"
        title="Twitter Page"
        rel="noopener noreferrer"
      >
        ZTP e2e Repo
      </Item>
    </Wrapper>
  );
}

const MobileWrapper = styled.nav`
  color: ${props => props.theme.text};
`;

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
  align-items: center;
  z-index: 1000;
`;

const Item = styled.a`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;
