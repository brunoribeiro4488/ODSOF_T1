import models from "../../../../../shared/infra/database/sequelize/models";
import {PostRepo} from "../sequelizePostRepo";
import {commentRepo, postVotesRepo} from "../../index";
import {PostDetails} from "../../../domain/postDetails";
import {PostDetailsMap} from "../../../mappers/postDetailsMap";
import {MemberDetails} from "../../../domain/memberDetails";
import {UserName} from "../../../../users/domain/userName";
import {PostTitle} from "../../../domain/postTitle";
import {PostSlug} from "../../../domain/postSlug";
import {PostText} from "../../../domain/postText";

let postDB = {memberId: "12",
    slug: "unit test",
    title: "unit test",
    type: "text",
    votes: 5};

let postDB2 = {memberId: "12",
    slug: "unit test",
    title: "unit test",
    type: "text",
    votes: 4};

let postTitle = PostTitle.create({ value: "HTML Developers" }).getValue();
let postSlug = PostSlug.create(postTitle).getValue();


let fun = models.Post;
let spy = jest.spyOn(fun, 'findAll').mockImplementation(() => {return [postDB, postDB2]});
let postRepo = new PostRepo(models, commentRepo, postVotesRepo);

let spyMapper = jest.spyOn(PostDetailsMap, "toDomain").mockImplementation(({memberId, slug, title, type, votes}) => {return PostDetails.create({member: MemberDetails.create({username: UserName.create({name: "UserName"}).getValue(),
        reputation: 95}).getValue(),
    slug: postSlug,
    title: postTitle,
    type: "text",
    numComments: 5,
    text: PostText.create({value : "ufufufufufufufufufufufufufufufufufufuf"}).getValue(),
    points: votes,
    dateTimePosted: new Date(1234),
    wasUpvotedByMe: true,
    wasDownvotedByMe: false}).getValue()})


describe("getPopularPost", () => {
    test("shoul return popular post in order by votes", () => {
        let popularPosts = postRepo.getPopularPosts().then(value => {
            expect(value).toEqual([PostDetails.create({member: MemberDetails.create({username: UserName.create({name: "UserName"}).getValue(),
                    reputation: 95}).getValue(),
                slug: postSlug,
                title: postTitle,
                type: "text",
                numComments: 5,
                text: PostText.create({value : "ufufufufufufufufufufufufufufufufufufuf"}).getValue(),
                points: 5,
                dateTimePosted: new Date(1234),
                wasUpvotedByMe: true,
                wasDownvotedByMe: false}).getValue(),
                PostDetails.create({member: MemberDetails.create({username: UserName.create({name: "UserName"}).getValue(),
                        reputation: 95}).getValue(),
                    slug: postSlug,
                    title: postTitle,
                    type: "text",
                    numComments: 5,
                    text: PostText.create({value : "ufufufufufufufufufufufufufufufufufufuf"}).getValue(),
                    points: 4,
                    dateTimePosted: new Date(1234),
                    wasUpvotedByMe: true,
                    wasDownvotedByMe: false}).getValue()])
        });
    });
});