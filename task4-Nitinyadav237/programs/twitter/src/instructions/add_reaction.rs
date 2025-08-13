//-------------------------------------------------------------------------------
///
/// TASK: Implement the add reaction functionality for the Twitter program
/// 
/// Requirements:
/// - Initialize a new reaction account with proper PDA seeds
/// - Increment the appropriate counter (likes or dislikes) on the tweet
/// - Set reaction fields: type, author, parent tweet, and bump
/// - Handle both Like and Dislike reaction types
/// 
///-------------------------------------------------------------------------------

use anchor_lang::prelude::*;
use crate::errors::TwitterError;
use crate::states::*;

pub fn add_reaction(ctx: Context<AddReactionContext>, reaction: ReactionType) -> Result<()> {
    let tweet = &mut ctx.accounts.tweet;
    let reaction_account = &mut ctx.accounts.tweet_reaction;
    let author = &ctx.accounts.reaction_author;

    // Increment appropriate counter based on reaction type
    match reaction {
        ReactionType::Like => {
            tweet.likes = tweet.likes.checked_add(1)
                .ok_or(TwitterError::MaxLikesReached)?;
        }
        ReactionType::Dislike => {
            tweet.dislikes = tweet.dislikes.checked_add(1)
                .ok_or(TwitterError::MaxDislikesReached)?;
        }
    }

    // Set reaction account data
    reaction_account.reaction_author = author.key();
    reaction_account.parent_tweet = tweet.key();
    reaction_account.reaction = reaction;
    reaction_account.bump = ctx.bumps.tweet_reaction;

    Ok(())
}

#[derive(Accounts)]
pub struct AddReactionContext<'info> {
    #[account(mut)]
    pub reaction_author: Signer<'info>,

    #[account(
        init,
        payer = reaction_author,
        space = 8 + Reaction::INIT_SPACE,
        seeds = [
            TWEET_REACTION_SEED.as_bytes(),
            reaction_author.key().as_ref(),
            tweet.key().as_ref()
        ],
        bump
    )]
    pub tweet_reaction: Account<'info, Reaction>,

    #[account(
        mut,
        seeds = [
            tweet.topic.as_bytes(),
            TWEET_SEED.as_bytes(),
            tweet.tweet_author.as_ref()
        ],
        bump = tweet.bump
    )]
    pub tweet: Account<'info, Tweet>,

    pub system_program: Program<'info, System>,
}
