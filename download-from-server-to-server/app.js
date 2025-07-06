import fs from 'fs'
import http from 'http'
import https from 'https'
import { URL } from 'url'

const imageList = [
  "https://res.cloudinary.com/practicaldev/image/fetch/s--jSbifrBQ--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/650567/47c70991-f1dd-4e3b-9961-51e9a5b0b1d6.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--jSbifrBQ--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/650567/47c70991-f1dd-4e3b-9961-51e9a5b0b1d6.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--jSbifrBQ--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/650567/47c70991-f1dd-4e3b-9961-51e9a5b0b1d6.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--jSbifrBQ--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/650567/47c70991-f1dd-4e3b-9961-51e9a5b0b1d6.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--yFYuRfNW--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/884746/b3b3922e-6db0-4eb5-bac4-01c7679ec357.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--yFYuRfNW--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/884746/b3b3922e-6db0-4eb5-bac4-01c7679ec357.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--6YVxr0m3--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/776290/220c6af7-784a-49fe-9e1a-d5c369ad4a52.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--6YVxr0m3--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/776290/220c6af7-784a-49fe-9e1a-d5c369ad4a52.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--t2qSNI7f--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/101884/3ed12c7e-7da1-48e3-8fbb-16bd86912594.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--t2qSNI7f--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/101884/3ed12c7e-7da1-48e3-8fbb-16bd86912594.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--CDrBcP-i--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/475257/32b2aad5-4765-4f88-92cd-bce615091588.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--CDrBcP-i--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/475257/32b2aad5-4765-4f88-92cd-bce615091588.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--tGqpvHfN--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/643377/5ac335ea-c3ee-493b-b593-aadde61fa234.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--tGqpvHfN--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/643377/5ac335ea-c3ee-493b-b593-aadde61fa234.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--1V_jyYF8--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/387353/4f95b7c2-c016-483b-be8a-9f7ffb148ccd.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--1V_jyYF8--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/387353/4f95b7c2-c016-483b-be8a-9f7ffb148ccd.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--7G9OUaQp--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/17494/f7b46164-53ce-446a-96bf-8ac1163c32f4.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--7G9OUaQp--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/17494/f7b46164-53ce-446a-96bf-8ac1163c32f4.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--K3pLw9FH--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/445936/bdbcdabb-441f-4990-becb-bcb7968be652.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--K3pLw9FH--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/445936/bdbcdabb-441f-4990-becb-bcb7968be652.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--w-b3X-qv--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/377314/d42434ea-6134-411c-be4b-6eac9879cf28.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--w-b3X-qv--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/377314/d42434ea-6134-411c-be4b-6eac9879cf28.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--tGqpvHfN--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/643377/5ac335ea-c3ee-493b-b593-aadde61fa234.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--tGqpvHfN--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/643377/5ac335ea-c3ee-493b-b593-aadde61fa234.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--rKgmQ6Er--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/196121/d20db29d-6f49-470b-a6a2-e5e7b890e49b.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--rKgmQ6Er--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/196121/d20db29d-6f49-470b-a6a2-e5e7b890e49b.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--6YVxr0m3--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/776290/220c6af7-784a-49fe-9e1a-d5c369ad4a52.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--6YVxr0m3--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/776290/220c6af7-784a-49fe-9e1a-d5c369ad4a52.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--jSbifrBQ--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/650567/47c70991-f1dd-4e3b-9961-51e9a5b0b1d6.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--jSbifrBQ--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/650567/47c70991-f1dd-4e3b-9961-51e9a5b0b1d6.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--2oj4z2Fl--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1048938/a16dd7ed-c945-4d7a-8061-37326a8d793e.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--2oj4z2Fl--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1048938/a16dd7ed-c945-4d7a-8061-37326a8d793e.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--D-9huM3W--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/327582/ea5ab93e-70d8-4770-b43a-b757d03f4a2c.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--D-9huM3W--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/327582/ea5ab93e-70d8-4770-b43a-b757d03f4a2c.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--5uqDeTMf--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/118762/85fd62f1-066b-4460-a20a-66b3d8df44b8.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--5uqDeTMf--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/118762/85fd62f1-066b-4460-a20a-66b3d8df44b8.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--hKQOI6TH--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/529222/e7bf7ebb-de3d-47fe-8f76-a5645a5c2fd7.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--hKQOI6TH--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/529222/e7bf7ebb-de3d-47fe-8f76-a5645a5c2fd7.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--kwVKLboc--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/351732/cead063a-45c2-454e-962a-725494f41e02.PNG",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--kwVKLboc--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/351732/cead063a-45c2-454e-962a-725494f41e02.PNG",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--OLbsMAdQ--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/702866/42004731-4116-4631-bf0a-c1b7bdfa91cd.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--OLbsMAdQ--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/702866/42004731-4116-4631-bf0a-c1b7bdfa91cd.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--ciV8On5c--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/132479/3881ee24-8b3a-4417-8e2f-cf8d5496d61d.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--ciV8On5c--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/132479/3881ee24-8b3a-4417-8e2f-cf8d5496d61d.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--BPgnUN2E--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/162904/686c0add-4aa1-42b1-a439-9656db6a9694.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--BPgnUN2E--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/162904/686c0add-4aa1-42b1-a439-9656db6a9694.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--lU3-9IYL--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/460305/2b205916-ecf6-4290-bc57-46acbd7caae5.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--lU3-9IYL--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/460305/2b205916-ecf6-4290-bc57-46acbd7caae5.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--FS9ORmjk--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/871348/f9858cf1-05b1-46c3-b1c1-116843470cf5.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--FS9ORmjk--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/871348/f9858cf1-05b1-46c3-b1c1-116843470cf5.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--W9a0eyQ2--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/340050/eb99ca51-93ba-4d13-87f4-1fccfbed76a2.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--W9a0eyQ2--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/340050/eb99ca51-93ba-4d13-87f4-1fccfbed76a2.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--txKlLmgg--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/555029/ce958e16-40ef-4b9b-bf99-93208e2a6351.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--txKlLmgg--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/555029/ce958e16-40ef-4b9b-bf99-93208e2a6351.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--o3pStKL8--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/35069/dd0e9793-31a0-4578-9a0c-aa07426276b4.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--o3pStKL8--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/35069/dd0e9793-31a0-4578-9a0c-aa07426276b4.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--5uqDeTMf--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/118762/85fd62f1-066b-4460-a20a-66b3d8df44b8.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--5uqDeTMf--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/118762/85fd62f1-066b-4460-a20a-66b3d8df44b8.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--pu4J_MfH--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/15781/15c4a4f6-a4c3-4335-88d7-6e759e27f7af.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--pu4J_MfH--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/15781/15c4a4f6-a4c3-4335-88d7-6e759e27f7af.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--cnT9wu2P--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/136055/814f322f-4c07-45c5-9070-7fd2b02f751c.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--cnT9wu2P--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/136055/814f322f-4c07-45c5-9070-7fd2b02f751c.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--Pl_y7jIp--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/319863/1cd69197-2729-412a-9511-3087f1c19e12.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--Pl_y7jIp--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/319863/1cd69197-2729-412a-9511-3087f1c19e12.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--vKwRJz8g--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/251120/5a0569f4-d0ae-4cea-b5e7-8391f608c21a.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--vKwRJz8g--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/251120/5a0569f4-d0ae-4cea-b5e7-8391f608c21a.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--iEwKpQ1Z--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/223427/b231606b-9b85-453a-93a5-2d117d45057a.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--iEwKpQ1Z--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/223427/b231606b-9b85-453a-93a5-2d117d45057a.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--ozvS3Ij7--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/94618/b7ca8981-0a79-4b28-a958-57eecbb9644a.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--ozvS3Ij7--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/94618/b7ca8981-0a79-4b28-a958-57eecbb9644a.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--vTAyIiyt--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/286527/94ff03d9-d1e9-4f23-a38d-f6905f03648a.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--vTAyIiyt--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/286527/94ff03d9-d1e9-4f23-a38d-f6905f03648a.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--trlkC0XK--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/291291/aeea4177-00a6-4651-b070-14e06792a0fa.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--trlkC0XK--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/291291/aeea4177-00a6-4651-b070-14e06792a0fa.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--JK-Ro0CK--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/238865/09c07534-0c61-403a-ae09-3e791f18f4c3.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--JK-Ro0CK--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/238865/09c07534-0c61-403a-ae09-3e791f18f4c3.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--S8yTQzrq--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/609606/e07b30eb-9879-4402-959f-c6cb92278c06.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--S8yTQzrq--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/609606/e07b30eb-9879-4402-959f-c6cb92278c06.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--VBIF0Qwy--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/55250/fc09d3ba-698f-472d-beab-7aca4ed8b576.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--VBIF0Qwy--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/55250/fc09d3ba-698f-472d-beab-7aca4ed8b576.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--tF6uHvyd--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/182527/13ca9a10-734e-47a7-9964-fb50975dfb1f.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--tF6uHvyd--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/182527/13ca9a10-734e-47a7-9964-fb50975dfb1f.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--ozNkS1-E--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/389225/4deb33d9-40ec-493b-be8c-ff8d6e737b53.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--ozNkS1-E--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/389225/4deb33d9-40ec-493b-be8c-ff8d6e737b53.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--oQOBqbuB--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/100704/4b5d93cc-8e19-47c2-b798-0ec5342c1ce2.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--oQOBqbuB--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/100704/4b5d93cc-8e19-47c2-b798-0ec5342c1ce2.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--5uqDeTMf--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/118762/85fd62f1-066b-4460-a20a-66b3d8df44b8.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--5uqDeTMf--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/118762/85fd62f1-066b-4460-a20a-66b3d8df44b8.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--E0jT8mme--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/326914/c1ad69e2-e529-4cb4-adc5-8d551b70ef62.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--E0jT8mme--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/326914/c1ad69e2-e529-4cb4-adc5-8d551b70ef62.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--Cs_8dfGS--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/110225/53d6bcbf-0d1d-4d6c-b292-6c1977393b74.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--Cs_8dfGS--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/110225/53d6bcbf-0d1d-4d6c-b292-6c1977393b74.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--UfqKoguK--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/9962/485c2672-fd98-46b9-8507-7c88da600361.JPG",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--UfqKoguK--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/9962/485c2672-fd98-46b9-8507-7c88da600361.JPG",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--_R-NlTBt--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/33918/2693d4fa-77e8-4188-9d87-f60389ab7feb.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--_R-NlTBt--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/33918/2693d4fa-77e8-4188-9d87-f60389ab7feb.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--fKbzLDzp--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/580317/065a581f-7feb-4994-9fef-53f44e766072.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--fKbzLDzp--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/580317/065a581f-7feb-4994-9fef-53f44e766072.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--Cegq7igF--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1006318/0cb78c58-3e70-4dce-ad07-1753e2d138b6.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--Cegq7igF--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1006318/0cb78c58-3e70-4dce-ad07-1753e2d138b6.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--cuClDbMK--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/185872/c50c299f-eb8d-4d66-9d37-730aad684706.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--cuClDbMK--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/185872/c50c299f-eb8d-4d66-9d37-730aad684706.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--RTHOgs-r--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/642348/c10c17aa-2556-49b8-9ffa-1c31cc9675e4.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--RTHOgs-r--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/642348/c10c17aa-2556-49b8-9ffa-1c31cc9675e4.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--u73cM-0J--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/434143/5d5c0502-1891-4c94-8861-42b282f4c269.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--u73cM-0J--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/434143/5d5c0502-1891-4c94-8861-42b282f4c269.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--4JkzxHNY--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/53297/6e820d76-82a8-45fe-944b-8e940d3b5405.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--4JkzxHNY--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/53297/6e820d76-82a8-45fe-944b-8e940d3b5405.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--8XZPvzAl--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/560117/d229a777-2969-47d8-a2c5-07fcff76bb8f.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--8XZPvzAl--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/560117/d229a777-2969-47d8-a2c5-07fcff76bb8f.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--S07SFibe--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/302537/80eb5e48-2ffc-4b20-ba81-f0f3d0e874df.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--S07SFibe--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/302537/80eb5e48-2ffc-4b20-ba81-f0f3d0e874df.png",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--e3suJSM8--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/397820/3d223e24-5e41-4e40-aa40-559d743d45c3.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--e3suJSM8--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/397820/3d223e24-5e41-4e40-aa40-559d743d45c3.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--nB7xMeht--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/302167/8da90a3f-de4d-4897-942d-6ffeb7819501.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--nB7xMeht--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/302167/8da90a3f-de4d-4897-942d-6ffeb7819501.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--_8wZzD_K--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/151755/57f5bcda-7cfa-408f-a072-ee9cd9aa1c92.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--_8wZzD_K--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/151755/57f5bcda-7cfa-408f-a072-ee9cd9aa1c92.jpeg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--5uqDeTMf--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/118762/85fd62f1-066b-4460-a20a-66b3d8df44b8.jpg",
  "https://res.cloudinary.com/practicaldev/image/fetch/s--5uqDeTMf--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/118762/85fd62f1-066b-4460-a20a-66b3d8df44b8.jpg"
]


const downloadFfile = (url, state) => {
  const userUrl = new URL(url)
  // console.log('--------------------------------', userUrl)
  const urlType = userUrl.protocol === 'http:' ? http : https
  const filename = 'images/' + url.split('/').pop()//get text after last slash

  const req = urlType.get(url, function (res) {
    const fileStream = fs.createWriteStream(filename)
    res.pipe(fileStream)

    fileStream.on('error', function(error){
      console.log(error)
    })

    fileStream.on('close', function(error){
      state(filename)//return completed message
    })

    fileStream.on('finished', function(error){
      fileStream.close()
    })

  })

  req.on('error',function(error) {
    console.log(error)
  })
}

// //loop downloadFfile function in foreach for multiple images
imageList.forEach(item => {
  downloadFfile(item, () => {
    console.log('Download complete!')
  })
})
