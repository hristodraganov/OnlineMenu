import React from 'react';
import { injectIntl } from 'react-intl';

const Input = ({ intl }) => {
    return <input placeholder={intl.formatMessage({ id: 'modal-placeholder' })} />
}
export default injectIntl(Input) 