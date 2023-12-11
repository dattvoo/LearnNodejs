"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
var UserVerifyStatus;
(function (UserVerifyStatus) {
    UserVerifyStatus[UserVerifyStatus["Unverified"] = 0] = "Unverified";
    UserVerifyStatus[UserVerifyStatus["Verified"] = 1] = "Verified";
    UserVerifyStatus[UserVerifyStatus["Banned"] = 2] = "Banned";
})(UserVerifyStatus || (UserVerifyStatus = {}));
var MediaType;
(function (MediaType) {
    MediaType[MediaType["Image"] = 0] = "Image";
    MediaType[MediaType["Video"] = 1] = "Video";
})(MediaType || (MediaType = {}));
var TweetAudience;
(function (TweetAudience) {
    TweetAudience[TweetAudience["Everyone"] = 0] = "Everyone";
    TweetAudience[TweetAudience["TwitterCircle"] = 1] = "TwitterCircle";
})(TweetAudience || (TweetAudience = {}));
var TweetType;
(function (TweetType) {
    TweetType[TweetType["Tweet"] = 0] = "Tweet";
    TweetType[TweetType["Retweet"] = 1] = "Retweet";
    TweetType[TweetType["Comment"] = 2] = "Comment";
    TweetType[TweetType["QuoteTweet"] = 3] = "QuoteTweet";
})(TweetType || (TweetType = {}));
class User {
    _id;
    name;
    email;
    date_of_birth;
    password;
    created_at;
    updated_at;
    email_verify_token;
    forgot_password_token;
    verify;
    bio;
    location;
    website;
    username;
    avatar;
    cover_photo;
    constructor(user) {
        const date = new Date();
        this._id = user._id || new mongodb_1.ObjectId();
        this.name = user.name || '';
        this.email = user.email;
        this.date_of_birth = user.date_of_birth || new Date();
        this.password = user.password;
        this.created_at = user.created_at || date;
        this.updated_at = user.updated_at || date;
        this.email_verify_token = user.email_verify_token || '';
        this.forgot_password_token = user.forgot_password_token || '';
        this.verify = user.verify || UserVerifyStatus.Unverified;
        this.bio = user.bio || '';
        this.location = user.location || '';
        this.website = user.website || '';
        this.username = user.username || '';
        this.avatar = user.avatar || '';
        this.cover_photo = user.cover_photo || '';
    }
}
exports.default = User;
