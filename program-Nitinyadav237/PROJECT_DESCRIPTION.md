# Project Description

**Deployed Frontend URL:** [TODO: Add your deployed frontend link]  
**Solana Program ID:** BAmKovDnmFfuvXASrEoRa115N3F4QEBCkjUQtRAvkpA  

---

## Project Overview

### Description  
**FundCycle Protocol** is a decentralized group savings and payout system built on Solana using the Anchor framework.  
It enables an admin to create fixed-term fund cycles where participants deposit collateral, contribute monthly, and receive round-robin payouts. The protocol enforces strict participation rules, ensuring fairness, accountability, and sustainability through built-in penalties and reserve funds.  

The protocol is inspired by traditional *chit funds / rotating savings models*, adapted for blockchain with transparency, automation, and program-enforced rules.

---

### Key Features  
- **Admin Initialization** – Admin creates and configures fund cycles with participant slots and parameters.  
- **Collateral Requirement** – Each participant must deposit collateral upfront to join a cycle.  
- **Monthly Contributions** – Members contribute funds on time to stay active.  
- **Round Robin Payouts** – 80% of the vault balance is paid monthly to one participant in order.  
- **Reserve Fund** – 20% of vault retained monthly for yield generation and risk reduction.  
- **Penalty System** – Late/missed payments mark members inactive and forfeit collateral.  
- **Conditional Withdrawals** – Payouts and collateral are released only after obligations are met.  
- **Cycle Exit Rules** – Participants can exit only after the cycle is complete and accounts are closed.  
- **Platform Fee** – 1.5% fee on deposits and payouts, stored in a protocol fee vault.  
- **Admin Fee Withdrawal** – Admin can withdraw accumulated fees for protocol maintenance.  

---

### How to Use the dApp  
1. **Connect Wallet** – Connect your Solana wallet.  
2. **Join Cycle** – Deposit required collateral and register as a participant.  
3. **Make Monthly Payments** – Contribute before deadlines to stay eligible.  
4. **Receive Payouts** – If it’s your turn, claim the round-robin payout.  
5. **Exit Cycle** – After the full cycle ends, reclaim your collateral if obligations were fulfilled.  

---

## Program Architecture  

The FundCycle program enforces cycle logic on-chain using PDAs and state accounts. Each cycle is deterministic, transparent, and non-custodial.  

### PDA Usage  
**Program Derived Addresses (PDAs)** ensure unique and secure accounts for each cycle and participant.  

- **Config PDA** – Derived with seeds `[b"config", cycle_id]`, holds global cycle settings.  
- **Vault PDA** – Derived with `[b"vault", config.key()]`, stores participant funds.  
- **Beneficiary PDA** – Derived with `[b"beneficiary", user_wallet]`, tracks individual participant status.  

---

### Program Instructions  

**Implemented Instructions:**  
- **initialize_cycle** – Creates a new fund cycle with configuration parameters.  
- **add_beneficiary** – Adds a participant and requires collateral deposit.  
- **make_payment** – Processes monthly contributions, marks participant active/inactive.  
- **claim_payout** – Allows eligible participant to claim round-robin payout.  
- **withdraw_collateral** – Enables participants to withdraw collateral after cycle completion.  
- **admin_withdraw_fees** – Lets admin withdraw accumulated platform fees.  
- **close_cycle** – Ends the cycle, closes accounts, and resolves pending obligations.  

---

### Account Structures  

```rust
#[account]
pub struct ConfigAccount {
    pub admin: Pubkey,
    pub collateral_amount: u64,
    pub monthly_payout: u64,
    pub payment_interval_days: u32,
    pub withdraw_percent: u8,
    pub max_beneficiaries: u8,
    pub current_index: u8,
    pub claimable: bool,
    pub claims_completed: u8,
    pub bump: u8,
}

#[account]
pub struct VaultAccount {
    pub config: Pubkey,
    pub bump: u8,
}

#[account]
pub struct BeneficiaryAccount {
    pub config: Pubkey,
    pub wallet: Pubkey,
    pub index: u8,
    pub collateral_paid: bool,
    pub monthly_paid: bool,
    pub last_payment_ts: i64,
    pub active: bool,
    pub collateral_claimed: bool,
    pub bump: u8,
}
