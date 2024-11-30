using QrCodeToolApi.Models;

namespace QrCodeToolApi.Services.Contracts
{
    public interface IAccountSerivce
    {
        Task<int> SignIn(SignInModel signInData);
        Task SignUp(SignUpModel signUpData);
        Task<string> GetName(string accountId);
    }
}