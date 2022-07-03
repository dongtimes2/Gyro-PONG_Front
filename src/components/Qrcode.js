import PropTypes from 'prop-types';
import { QRCodeSVG } from 'qrcode.react';

const Qrcode = ({ link, size }) => {
  return <QRCodeSVG value={link} size={size} />;
};

Qrcode.propTypes = {
  link: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default Qrcode;
