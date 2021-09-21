import * as S from './styles'

export default function SignIn() {

  return (
    <S.Wrapper >
      <S.WrapperLeft>
        <S.Header>
          <a href="/">
            <img src="img/icons/return.svg" alt="Description here" />
            Hompeage
          </a>
        </S.Header>
      <S.Form>
          <S.FormHeader>
            <img src="img/logo.svg" alt="Description here" />
          </S.FormHeader>
          <S.FormTitle>
            <h1>Welcome Back!</h1>
            <p>Welcome back, Please login in to your account.</p>
          </S.FormTitle>
          <S.FormBox>
            <S.FormWrapperInput>
              <label htmlFor="email">Email Address</label>
              <input type="email" name="email" id="email" placeholder="Enter your email" />
            </S.FormWrapperInput>
            <S.FormWrapperInput>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder="Enter your password"/>
            </S.FormWrapperInput>
            <S.FormActions>
              <S.Button>
                Login
              </S.Button>
              <a href="/forgot">Forgot Password</a>
            </S.FormActions>
          </S.FormBox>

      </S.Form>
      <S.Footer>
        <p>Dont have an account yet?<a href="/signup"> Sign up</a></p>
      </S.Footer>
      </S.WrapperLeft>
      <S.WrapperRight>
          <h2>Buy and Sell Cryptocurrencies.<br />
            <strong>Fast and Secure </strong></h2>
          <img src="img/polkadex.png" alt="Descripton here" />
      </S.WrapperRight>
    </S.Wrapper>
  )
}
