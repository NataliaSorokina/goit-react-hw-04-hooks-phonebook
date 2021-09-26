import React from 'react';
import PropTypes from 'prop-types';
import { MinorTitle } from './Section.styled';

const Section = ({ title, children }) => {
  return (
    <section>
      <MinorTitle>{title}</MinorTitle>
      {children}
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Section;
