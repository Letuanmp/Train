import "../src/styles/grid.css";
import "./login.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="grid parent-container">
        <div class="container col c-4">
            <form id="loginForm" method="post" class="col container-login" action="">
                <div class="heading">
                    <h3>Sign in</h3>
                </div>
                <div class="form-group col ">
                    <input id="username" name="username" type="text" class="form-control " placeholder="Enter your username">
                    <div><span class="form-message"></span></div>
                </div>
                <div class="form-group col ">
                    <input id="password" name="password" type="password" class="form-control" placeholder="Enter your password">
                    <div>
                    <span class="form-message"></span>
                    </div>
                </div>
                <div class="form-group col">
                    <input type="checkbox" class="form-checkbox">
                    <label for="remember">Remember me</label>   
                </div>
                <div class="form-group col">
                    <button type="submit" class="btn-login btn-primary">Login</button>
                </div>
                <a href="#" class="col forgot-password text-muted">Forgot Password?</a>
            </form>
            <div class="sign-in-with">
                <h5>Sign in with</h5>
                <div class="row">
                    <div class="col-12">
                        <button type="button" class="btn-sign btn-fa">
                            <i class="fa-facebook">Facebook</i>
                        </button>
                        <button type="button" class="btn-sign btn-tw">
                            <i class="fa-twitter">Twitter</i>
                        </button>
                        <button type="button" class="btn-sign btn-gg">
                            <i class="fa-google">Google</i>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <p class="text-center">Don't have an account? <a style="text-decoration: none; href="#" class="text-primary">Sign up</a></p>
            </div>
        </div>
    </div>
`;
