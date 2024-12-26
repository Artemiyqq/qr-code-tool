using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QrCodeToolApi.Data;
using QrCodeToolApi.Exceptions;
using QrCodeToolApi.Models;
using QrCodeToolApi.Services.Contracts;

namespace QrCodeToolApi.Services.Implementations
{
    public class AccountService(QrCodeToolDbContext context) : IAccountSerivce
    {
        private readonly QrCodeToolDbContext _context = context;
        private readonly PasswordHasher<string> _passwordHasher = new();

        public async Task<int> SignIn(SignInModel signInData)
        {
            Account? account = await _context.Accounts.FirstOrDefaultAsync(a => a.Email == signInData.Email);

            if (account is null) throw new Exceptions.AuthenticationException("Invalid credentials");

            PasswordVerificationResult verificationResult = _passwordHasher.VerifyHashedPassword(account.Name,
                                                                                                 account.Password,
                                                                                                 signInData.Password);

            if (verificationResult != PasswordVerificationResult.Success )
            {
                throw new Exceptions.AuthenticationException("Invalid credentials");
            }

            return account.Id;
        }
        public async Task SignUp(SignUpModel signUpData)
        {
            if (_context.Accounts.Any(a => a.Email == signUpData.Email)) throw new ValidationException("Email already exists");

            Account account = new()
            {
                Name = signUpData.Name,
                Email = signUpData.Email,
                Password = _passwordHasher.HashPassword(signUpData.Name, signUpData.Password),
            };
            
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            return;
        }
        public async Task<string> GetName(string accountId)
        {
            Account? account = await _context.Accounts.FirstOrDefaultAsync(a => a.Id == int.Parse(accountId));
            if (account is null) throw new NotFoundException("Account not found");
            return account.Name;
        } 
    }
}