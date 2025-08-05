//-------------------------------------------------------------------------------
///
/// TASK: Implement the withdraw functionality for the on-chain vault
/// 
/// Requirements:
/// - Verify that the vault is not locked
/// - Verify that the vault has enough balance to withdraw
/// - Transfer lamports from vault to vault authority
/// - Emit a withdraw event after successful transfer
/// 
///-------------------------------------------------------------------------------

use anchor_lang::prelude::*;
use crate::state::Vault;
use crate::errors::VaultError;
use crate::events::WithdrawEvent;

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub vault_authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"vault", vault_authority.key().as_ref()],
        bump,
        has_one = vault_authority
    )]
    pub vault: Account<'info, Vault>,

    pub system_program: Program<'info, System>,
}

pub fn _withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
    // TODO: Implement withdraw functionality
    
    let vault = &ctx.accounts.vault;
    let vault_info = vault.to_account_info();
    let authority_info = ctx.accounts.vault_authority.to_account_info();

    // 1. Check vault is not locked
    require!(!vault.locked, VaultError::VaultLocked);

    // 2. Check vault has enough lamports
    let vault_balance = vault_info.lamports();
    require!(vault_balance >= amount, VaultError::InsufficientBalance);

    // 3. Transfer lamports from vault PDA to vault authority
    **vault_info.try_borrow_mut_lamports()? -= amount;
    **authority_info.try_borrow_mut_lamports()? += amount;

    // 4. Emit withdraw event
    emit!(WithdrawEvent {
        vault: vault.key(),
        vault_authority: ctx.accounts.vault_authority.key(),
        amount,
    });

    Ok(())
}
