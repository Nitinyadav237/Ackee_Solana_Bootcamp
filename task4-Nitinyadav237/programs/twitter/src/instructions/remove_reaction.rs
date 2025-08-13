//-------------------------------------------------------------------------------
///
/// TASK: Implement the remove reaction functionality for the Twitter program
/// 
/// Requirements:
/// - Verify that the tweet reaction exists and belongs to the reaction author
/// - Decrement the appropriate counter (likes or dislikes) on the tweet
/// - Close the tweet reaction account and return rent to reaction author
/// 
///-------------------------------------------------------------------------------
use anchor_lang::prelude::*;
use crate::errors::TwitterError;
use crate::states::*;

pub fn remove_reaction(ctx: Context<RemoveReactionContext>) -> Result<()> {
    let tweet = &mut ctx.accounts.tweet;
    let reaction = &ctx.accounts.tweet_reaction;
    let author = &ctx.accounts.reaction_author;

    // Ensure the reaction belongs to the author
    require!(
        reaction.reaction_author == author.key(),
        TwitterError::MinLikesReached // Using existing error, though message may not perfectly match
    );

    // Decrement the appropriate counter
    match reaction.reaction {
        ReactionType::Like => {
            tweet.likes = tweet.likes.checked_sub(1)
                .ok_or(TwitterError::MinLikesReached)?;
        }
        ReactionType::Dislike => {
            tweet.dislikes = tweet.dislikes.checked_sub(1)
                .ok_or(TwitterError::MinDislikesReached)?;
        }
    }

    // Account will be closed and rent returned automatically via `close = reaction_author`
    Ok(())
}

#[derive(Accounts)]
pub struct RemoveReactionContext<'info> {
    #[account(mut)]
    pub reaction_author: Signer<'info>,

    #[account(
        mut,
        close = reaction_author,
        seeds = [
            TWEET_REACTION_SEED.as_bytes(),
            reaction_author.key().as_ref(),
            tweet.key().as_ref()
        ],
        bump = tweet_reaction.bump
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
}
