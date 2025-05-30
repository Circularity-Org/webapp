/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Position = {
    /**
     * Address of the position
     */
    address: string;
    /**
     * Created at utc timestamp
     */
    created_at: string;
    /**
     * Address of the position owner
     */
    owner: string;
    /**
     * Address of the liquidity pair for the position
     */
    pair_address: string;
    /**
     * Total fee has been claimed in USD
     */
    total_fee_usd_claimed: number;
    /**
     * Total fee X has been claimed
     */
    total_fee_x_claimed: number;
    /**
     * Total fee Y has been claimed
     */
    total_fee_y_claimed: number;
    /**
     * Total farm reward has been claimed in USD
     */
    total_reward_usd_claimed: number;
    /**
     * Total farm reward X has been claimed
     */
    total_reward_x_claimed: number;
    /**
     * Total farm reward Y has been claimed
     */
    total_reward_y_claimed: number;
};

