import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Card from 'components/Atoms/Card';
import Form from 'components/Atoms/Form';
import Input from 'components/Atoms/Input';
import PageContainer from 'components/Atoms/PageContainer';

import { textConstants } from 'appConstants';
import Styles from './LoginPage.module.sass';
import Checkbox from 'components/Atoms/Checkbox';
import Loading from 'components/Atoms/Loading';

const LoginPage = ({ loginReguest, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberUser, setRememberUser] = useState(false);
  const submitLogin = e => {
    e.preventDefault();
    loginReguest({ email, password, rememberUser });
  };
  const editEmail = e => {
    setEmail(e.target.value);
  };
  const editPassword = e => {
    setPassword(e.target.value);
  };
  const toglgeRememberMe = e => {
    setRememberUser(e.target.checked);
  };
  return (
    <PageContainer className={Styles.Login}>
      {loading && <Loading />}
      <Card
        title={textConstants.login.TITLE}
        description={textConstants.login.DESCRIPTION}
      >
        <Form
          onSubmit={submitLogin}
          buttonText={textConstants.login.BUTTON_TEXT}
          showButtonOnForm
        >
          <Input
            label={textConstants.login.EMAIL_LABEL}
            value={email}
            onChange={editEmail}
          />
          <Input
            label={textConstants.login.PASSWORD_LABEL}
            type='password'
            value={password}
            onChange={editPassword}
          />
          <div className={Styles.checkboxContainer}>
            <Checkbox
              label={textConstants.misc.REMEMBER_ME}
              checked={rememberUser}
              onChange={toglgeRememberMe}
            />
          </div>
        </Form>
      </Card>
    </PageContainer>
  );
};

LoginPage.propTypes = {
  loginReguest: PropTypes.func,
};

export default LoginPage;
