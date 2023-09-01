
//adding the express, morgan, file system and path packages
const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    uuid = require('uuid'),
    bodyParser = require('body-parser'),
    path = require('path');


//running the express package put in variable called app
const app = express();

//Appends the log.txt file 
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})


//Middleware functions must be used
app.use(morgan('combined', {stream: accessLogStream}));

//For when accessing the body of a request using req.body
app.use(bodyParser.json());


// //array of objects on users
let users = [
    {
        id: 1,
        name: 'Chris Bond',
        favouriteFilms: []
    
    },
    {
        id: 2,
        name: 'Tom Smith',
        favouriteFilms: []
    }
]



//array of  JSON objects of all James Bond films
let jamesBondFilms = [
    {
        "Title": "Goldfinger",
        "Director": {
            "Name": "Guy Hamilton",
            "Bio": "Guy Hamilton was a British film director known for his work on the James Bond film series. He was born on September 16, 1922, in Paris, France, to British parents. Hamilton directed a total of four James Bond films, including 'Goldfinger,' which is considered one of the most iconic films in the series. His direction contributed significantly to the establishment of the Bond franchise's visual style and action-packed sequences. Hamilton's impact on the spy genre and his memorable contributions to popular cinema are widely recognized.",
            "Date Of Birth": "September 16, 1922"
        },
        "Actor": "Sean Connery",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Mystery"],
        "Description": "James Bond investigates Auric Goldfinger, a wealthy gold smuggler with a devious plan to contaminate the United States Bullion Depository at Fort Knox.",
        "ImageURL": "https://media.gq-magazine.co.uk/photos/5d1394634858d3440a004d21/4:3/w_1560,h_1170,c_limit/Goldfinger-hp-GQ-07Apr15_rex_b.jpg"
    },
    {
        "Title": "From Russia With Love",
        "Director": {
            "Name": "Terence Young",
            "Bio": "Terence Young was an English film director and screenwriter, best known for directing the early James Bond films. He was born on June 20, 1915, in Shanghai, China, to British parents. Young began his career as an assistant director and worked on various films before gaining recognition for his work on the James Bond series. He directed three of the first four Bond films, helping to establish the iconic style of the series. Young's contributions to the spy genre and his impact on popular culture are widely acknowledged.",
            "Date Of Birth": "June 20, 1915"
        },
        "Actor": "Sean Connery",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Mystery", "Romance", "Crime Fiction"],
        "Description": "James Bond is sent to Istanbul to retrieve a decoding machine, but he becomes entangled in a deadly game of espionage and romance involving a Soviet defector.",
        "ImageURL": "https://imageio.forbes.com/specials-images/imageserve/62543ad901a6cf103201f237/0x0.jpg?format=jpg&crop=2458,1383,x0,y24,safe&width=1200"
    },
    {
        "Title": "Dr.No",
        "Director": {
            "Name": "Terence Young",
            "Bio": "Terence Young was an English film director and screenwriter, best known for directing the early James Bond films. He was born on June 20, 1915, in Shanghai, China, to British parents. Young began his career as an assistant director and worked on various films before gaining recognition for his work on the James Bond series. He directed three of the first four Bond films, helping to establish the iconic style of the series. Young's contributions to the spy genre and his impact on popular culture are widely acknowledged.",
            "Date Of Birth": "June 20, 1915"
        },
        "Actor": "Sean Connery",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Romance", "Crime Fiction"],
        "Description": "James Bond is dispatched to Jamaica to investigate the disappearance of a fellow British agent and discovers a plot involving a reclusive villain named Dr. No.",
        "ImageURL": "https://eder6ypjvgv.exactdn.com/wp-content/uploads/2020/11/Capture-de%CC%81cran-2020-11-19-a%CC%80-16.13.07.jpg?strip=all&lossy=1&resize=1280%2C650&ssl=1"
    },
    {
        "Title": "Casino Royale",
        "Director": {
            "Name": "Martin Campbell",
            "Bio": "Martin Campbell is a New Zealand film and television director and producer. He was born on October 24, 1943, in Hastings, New Zealand. Campbell is known for his work on action-packed films and successful franchise reboots. He directed two James Bond films: 'GoldenEye' and 'Casino Royale.' 'Casino Royale' marked the beginning of the Daniel Craig era as James Bond and received critical acclaim for its gritty and realistic take on the character. Campbell's contribution to revitalizing the Bond franchise is widely recognized.",
            "Date Of Birth": "October 24, 1943"
        },
        "Actor": "Daniel Craig",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Mystery", "Romance", "Crime Fiction"],
        "Description": "James Bond's first mission as a 00 agent leads him to a high-stakes poker game at Casino Royale where he faces off against a dangerous terrorist financier.",
        "ImageURL": "https://www.slashfilm.com/img/gallery/why-casino-royale-is-the-best-james-bond-movie/l-intro-1633615873.jpg",
    },
    {
        "Title": "Skyfall",
        "Director": {
            "Name": "Sam Mendes",
            "Bio": "Sam Mendes is an English film and stage director and producer. He was born on August 1, 1965, in Reading, Berkshire, England. Mendes gained prominence with his debut film 'American Beauty,' which won multiple awards, including the Academy Award for Best Director. He later directed two James Bond films: 'Skyfall' and 'Spectre.' 'Skyfall' is notable for celebrating the Bond franchise's 50th anniversary and exploring deeper character development. Mendes' contributions to the Bond series are praised for their emotional depth and visual storytelling.",
            "Date Of Birth": "August 1, 1965"
        },
        "Actor": "Daniel Craig",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Mystery", "Crime Fiction"],
        "Description": "When MI6 comes under attack, James Bond must track down and eliminate the threat while confronting secrets from M's past.",
        "ImageURL": "https://media.vanityfair.com/photos/54ca91a3b8f23e3a0313ce98/master/w_2560%2Cc_limit/image.jpg"
    },
    {
        "Title": "Thunderball",
        "Director": {
            "Name": "Terence Young",
            "Bio": "Terence Young was an English film director and screenwriter, best known for directing the early James Bond films. He was born on June 20, 1915, in Shanghai, China, to British parents. Young began his career as an assistant director and worked on various films before gaining recognition for his work on the James Bond series. He directed three of the first four Bond films, helping to establish the iconic style of the series. Young's contributions to the spy genre and his impact on popular culture are widely acknowledged.",
            "Date Of Birth": "June 20, 1915"
        },
        "Actor": "Sean Connery",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Mystery", "Science Fiction", "Crime Fiction"],
        "Description": "James Bond is assigned to recover two nuclear warheads stolen by SPECTRE and held for ransom under threat of detonation.",
        "ImageURL": "https://i0.wp.com/geeksoup.co.uk/wp-content/uploads/2022/09/thunderball-james-bond.jpg?fit=1000%2C600&ssl=1"
    },
    {
        "Title": "No Time To Die",
        "Director": {
            "Name": "Cary Joji Fukunaga",
            "Bio": "Cary Joji Fukunaga is an American film director, writer, and cinematographer. He was born on July 10, 1977, in Oakland, California, USA. Fukunaga gained recognition for his work on the critically acclaimed film 'Sin Nombre' and the TV series 'True Detective.' He directed 'No Time To Die,' which marks Daniel Craig's final appearance as James Bond. Fukunaga's direction in the film blends action, emotion, and suspense, contributing to the evolving Bond narrative.",
            "Date Of Birth": "July 10, 1977"
        },
        "Actor": "Daniel Craig",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Mystery", "Crime Fiction"],
        "Description": "James Bond's peaceful retirement is disrupted when an old friend from the CIA asks for help, leading Bond onto the trail of a mysterious villain armed with dangerous technology.",
        "ImageURL": "https://ychef.files.bbci.co.uk/976x549/p09x617v.jpg"
    },
    {
        "Title": "The Spy Who Loved Me",
        "Director": {
            "Name": "Lewis Gilbert",
            "Bio": "Lewis Gilbert was an English film director, producer, and screenwriter. He was born on March 6, 1920, in Hackney, London, England. Gilbert's career in the film industry spanned several decades, during which he directed a variety of films across different genres. He is best known for his work on three James Bond films, including 'The Spy Who Loved Me.' Gilbert's contribution to the Bond series brought innovative action sequences and memorable moments to the screen.",
            "Date Of Birth": "March 6, 1920"
        },
        "Actor": "Roger Moore",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Mystery", "Science Fiction"],
        "Description": "James Bond teams up with a Soviet agent to investigate the disappearance of nuclear submarines and uncovers a plot to trigger a global catastrophe.",
        "ImageURL": "https://i0.wp.com/popculturemaniacs.com/wp-content/uploads/2021/07/the-spy-who-loved-me-bond-and-amasova-thumpnail.jpg?fit=2230%2C1514&ssl=1"
    },
    {
        "Title": "007 On Her Majesty's Secret Service",
        "Director": {
            "Name": "Peter Hunt",
            "Bio": "Peter Hunt was an English film editor, director, and producer. He was born on March 11, 1925, in London, England. Hunt is known for his significant contribution to the James Bond film series, particularly as the editor of the first five Bond films. He later directed 'On Her Majesty's Secret Service,' bringing his unique editing style and creative vision to the director's chair. Hunt's work had a lasting impact on the Bond series and the action film genre as a whole.",
            "Date Of Birth": "March 11, 1925"
        },
        "Actor": "George Lazenby",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Romance", "Crime Fiction"],
        "Description": "James Bond falls in love and marries Tracy, only to have his happiness shattered by the criminal organization SPECTRE and its leader Ernst Stavro Blofeld.",
        "ImageURL": "https://www.007.com/wp-content/uploads/2019/01/her007_WEBSITE_IMAGE_SIZE_LANDSCAPE.png"
    },
    {
        "Title": "Goldeneye",
        "Director": {
            "Name": "Martin Campbell",
            "Bio": "Martin Campbell is a New Zealand film and television director and producer. He was born on October 24, 1943, in Hastings, New Zealand. Campbell is known for his work on action-packed films and successful franchise reboots. He directed two James Bond films: 'GoldenEye' and 'Casino Royale.' 'Casino Royale' marked the beginning of the Daniel Craig era as James Bond and received critical acclaim for its gritty and realistic take on the character. Campbell's contribution to revitalizing the Bond franchise is widely recognized.",
            "Date Of Birth": "October 24, 1943"
        },
        "Actor": "Pierce Brosnan",
        "Genre": ["Action", "Spy", "Adventure", "Thriller"],
        "Description": "James Bond must stop a former MI6 agent who has turned rogue and plans to use a satellite weapon to cause a global financial meltdown.",
        "ImageURL": "https://www.telegraph.co.uk/content/dam/films/2022/08/06/TELEMMGLPICT000305015169_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwWyaKjL1CatlwZEbgNRqSgg.jpeg"
    },
    {
        "Title": "Licence To Kill",
        "Director": {
            "Name": "John Glen",
            "Bio": "John Glen was an English film director and editor. He was born on May 15, 1932, in Sunbury-on-Thames, England. Glen had a significant impact on the James Bond film series, directing five consecutive Bond films, starting with 'For Your Eyes Only' and ending with 'Licence to Kill.' Before directing, he worked as an editor on several Bond films. Glen's contributions helped define the modern Bond film formula and maintained the series' popularity throughout the 1980s.",
            "Date Of Birth": "May 15, 1932"
        },
        "Actor": "Timothy Dalton",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Crime Fiction"],
        "Description": "James Bond goes on a personal vendetta to take down a ruthless drug lord after his friend Felix Leiter is brutally attacked and left for dead.",
        "ImageURL": "https://i0.wp.com/midwestfilmjournal.com/wp-content/uploads/2021/11/Screen-Shot-2021-11-24-at-2.40.08-PM.png?fit=1576%2C930&ssl=1"
    },
    {
        "Title": "You Only Live Twice",
        "Director": {
            "Name": "Lewis Gilbert",
            "Bio": "Lewis Gilbert was an English film director, producer, and screenwriter with a career spanning several decades. He was born on March 6, 1920, in London, England. Gilbert's work encompassed a wide range of genres, and he directed three James Bond films, including 'Moonraker.' His contributions to the franchise include his unique visual style and the creative execution of the film's action sequences. Gilbert's legacy extends beyond Bond films, as he directed other notable movies that left a lasting impact on the world of cinema.",
            "Date Of Birth": "March 6, 1920"
        },
        "Actor": "Sean Connery",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Crime Fiction"],
        "Description": "James Bond is sent to Japan to investigate the hijacking of American and Soviet space capsules, leading him to a secret base hidden in a volcano.",
        "ImageURL": "https://i.guim.co.uk/img/media/08ba8b548a8039004f7849dba2229e6ef390566f/0_23_2544_1526/master/2544.jpg?width=1200&quality=85&auto=format&fit=max&s=37ac0d838dc3e6e0b73d1cd1a0fe224f"
    },
    {
        "Title": "The Living Daylights",
        "Director": {
            "Name": "John Glen",
            "Bio": "John Glen was an English film director and editor. He was born on May 15, 1932, in Sunbury-on-Thames, England. Glen had a significant impact on the James Bond film series, directing five consecutive Bond films, starting with 'For Your Eyes Only' and ending with 'Licence to Kill.' Before directing, he worked as an editor on several Bond films. Glen's contributions helped define the modern Bond film formula and maintained the series' popularity throughout the 1980s.",
            "Date Of Birth": "May 15, 1932"
        },
        "Actor": "Timothy Dalton",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "War", "Crime Fiction"],
        "Description": "James Bond is assigned to protect a Soviet defector and crosses paths with an arms dealer while navigating a complex web of espionage.",
        "ImageURL": "https://a.ltrbxd.com/resized/sm/upload/oc/bc/0g/bk/8TPStgzHahi6Cx3wimpipAV8BnN-1200-1200-675-675-crop-000000.jpg?v=2b34d02508"
    },
    {
        "Title": "Never Say Never Again",
        "Director": {
            "Name": "Irvin Kershner",
            "Bio": "Irvin Kershner was an American filmmaker and director known for his versatile work in film and television. He was born on April 29, 1923, in Philadelphia, Pennsylvania, USA. Kershner's career spanned several decades, during which he directed a wide range of projects. He directed 'Never Say Never Again,' a unique entry in the James Bond series. Kershner's approach to storytelling and his ability to elicit compelling performances from actors contributed to the success of his films. His contributions to the world of cinema continue to be appreciated by audiences and fellow filmmakers.",
            "Date Of Birth": "April 29, 1923"
        },
        "Actor": "Sean Connery",
        "Genre": ["Action", "Spy", "Adventure", "Thriller"],
        "Description": "James Bond is reactivated to thwart a plot involving stolen nuclear warheads and battles against the villainous SPECTRE organization.",
        "ImageURL": "https://www.on-magazine.co.uk/wp-content/uploads/never-say-never-again-film-review-main-600x315.jpg"
    },
    {
        "Title": "For Your Eyes Only",
        "Director": {
            "Name": "John Glen",
            "Bio": "John Glen was an English film director and editor. He was born on May 15, 1932, in Sunbury-on-Thames, England. Glen had a significant impact on the James Bond film series, directing five consecutive Bond films, starting with 'For Your Eyes Only' and ending with 'Licence to Kill.' Before directing, he worked as an editor on several Bond films. Glen's contributions helped define the modern Bond film formula and maintained the series' popularity throughout the 1980s.",
            "Date Of Birth": "May 15, 1932"
        },
        "Actor": "Roger Moore",
        "Genre": ["Action", "Spy", "Adventure", "Thriller"],
        "Description": "James Bond is tasked with recovering a communications device before it falls into the wrong hands and takes him from the Mediterranean to the Greek underworld.",
        "ImageURL": "https://images.squarespace-cdn.com/content/v1/59e512ddf43b55c29c71b996/1508700876985-P8GA3X72OUU0L7M437WX/For-Your-Eyes-Only.jpg"
    },
    {
        "Title": "Live And Let Die",
        "Director": {
            "Name": "Guy Hamilton",
            "Bio": "Guy Hamilton was a British film director known for his work on the James Bond film series. He was born on September 16, 1922, in Paris, France, to British parents. Hamilton directed a total of four James Bond films, including 'Goldfinger,' which is considered one of the most iconic films in the series. His direction contributed significantly to the establishment of the Bond franchise's visual style and action-packed sequences. Hamilton's impact on the spy genre and his memorable contributions to popular cinema are widely recognized.",
            "Date Of Birth": "September 16, 1922"
        },
        "Actor": "Roger Moore",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Mystery", "Crime Fiction"],
        "Description": "James Bond investigates a drug lord's connection to a string of murders while navigating the dangerous world of voodoo and organized crime.",
        "ImageURL": "https://i2-prod.mylondon.news/incoming/article21740670.ece/ALTERNATES/s615/2_james-bond.jpg"
    },
    {
        "Title": "Quantum Of Solace",
        "Director": {
            "Name": "Marc Forster",
            "Bio": "Marc Forster is a German-Swiss filmmaker known for his diverse filmography and innovative storytelling techniques. He was born on November 30, 1969, in Ulm, Germany. Forster's work spans various genres, from drama to action, and he is recognized for his direction of 'Quantum Of Solace,' a unique entry in the James Bond series. Forster's approach to character development and visual storytelling has left a distinctive mark on the film industry. His contributions to cinema continue to influence and inspire filmmakers and audiences alike.",
            "Date Of Birth": "November 30, 1969"
        },
        "Actor": "Daniel Craig",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Crime Fiction"],
        "Description": "James Bond seeks vengeance for the death of Vesper Lynd and uncovers a sinister organization's plot to control valuable resources.",
        "ImageURL": "https://www.theedgesusu.co.uk/wp-content/uploads/2018/10/QOS.jpg"
    },
    {
        "Title": "Spectre",
        "Director": {
            "Name": "Sam Mendes",
            "Bio": "Sam Mendes is an English film and stage director and producer. He was born on August 1, 1965, in Reading, Berkshire, England. Mendes gained prominence with his debut film 'American Beauty,' which won multiple awards, including the Academy Award for Best Director. He later directed two James Bond films: 'Skyfall' and 'Spectre.' 'Skyfall' is notable for celebrating the Bond franchise's 50th anniversary and exploring deeper character development. Mendes' contributions to the Bond series are praised for their emotional depth and visual storytelling.",
            "Date Of Birth": "August 1, 1965"
        },
        "Actor": "Daniel Craig",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Crime Fiction"],
        "Description": "James Bond follows a trail of cryptic messages leading him to a hidden criminal organization, while confronting personal demons and uncovering shocking truths.",
        "ImageURL": "https://m.media-amazon.com/images/M/MV5BOTkxMTQ2NjMxNl5BMl5BanBnXkFtZTgwMDEzMzMzNjE@._V1_.jpg"
    },
    {
        "Title": "Diamonds Are Forever",
        "Director": {
            "Name": "Guy Hamilton",
            "Bio": "Guy Hamilton was a British film director known for his work on the James Bond film series. He was born on September 16, 1922, in Paris, France, to British parents. Hamilton directed a total of four James Bond films, including 'Goldfinger,' which is considered one of the most iconic films in the series. His direction contributed significantly to the establishment of the Bond franchise's visual style and action-packed sequences. Hamilton's impact on the spy genre and his memorable contributions to popular cinema are widely recognized.",
            "Date Of Birth": "September 16, 1922"
        },
        "Actor": "Sean Connery",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Science Fiction", "Crime Fiction"],
        "Description": "James Bond infiltrates a diamond-smuggling operation linked to the sinister Blofeld and uncovers a plot involving a space-based weapon.",
        "ImageURL": "https://www.bondsuits.com/wp-content/uploads/2012/01/Diamonds-Are-Forever-Grey-Flannel-Suit.jpg"
    },
    {
        "Title": "Moonraker",
        "Director": {
            "Name": "Lewis Gilbert",
            "Bio": "Lewis Gilbert was an English film director, producer, and screenwriter with a career spanning several decades. He was born on March 6, 1920, in London, England. Gilbert's work encompassed a wide range of genres, and he directed three James Bond films, including 'Moonraker.' His contributions to the franchise include his unique visual style and the creative execution of the film's action sequences. Gilbert's legacy extends beyond Bond films, as he directed other notable movies that left a lasting impact on the world of cinema.",
            "Date Of Birth": "March 6, 1920"
        },
        "Actor": "Roger Moore",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Mystery", "Romance", "Science Fiction"],
        "Description": "James Bond investigates the theft of a space shuttle and uncovers a plot to launch a global genocide using a fleet of space stations.",
        "ImageURL": "https://images.squarespace-cdn.com/content/v1/59e512ddf43b55c29c71b996/1508700880665-W7524SYP3144GCDQGB3V/moonraker.jpg"
    },
    {
        "Title": "Tomorrow Never Dies",
        "Director": {
            "Name": "Roger Spottiswoode",
            "Bio": "Roger Spottiswoode is a Canadian-British film director and editor known for his work in both Hollywood and the United Kingdom. He was born on January 5, 1945, in Ottawa, Canada. Spottiswoode has directed a variety of films spanning different genres, showcasing his versatility as a filmmaker. In the realm of James Bond, he directed 'Tomorrow Never Dies,' bringing his unique vision to the franchise. His experience and creativity contributed to the dynamic action sequences and storytelling of the film.",
            "Date Of Birth": "January 5, 1945"
        },
        "Actor": "Pierce Brosnan",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Crime Fiction"],
        "Description": "James Bond goes up against a media mogul who manipulates global events to provoke war between China and the UK.",
        "ImageURL": "https://i0.wp.com/thatnerdysite.com/wp-content/uploads/2022/04/tomorrow-never-dies.png?fit=1389%2C813&ssl=1"
    },
    {
        "Title": "Die Another Day",
        "Director": {
            "Name": "Lee Tamahori",
            "Bio": "Lee Tamahori is a New Zealand film director known for his work in both his home country and Hollywood. He was born on June 17, 1950, in Wellington, New Zealand. Tamahori gained international recognition for directing the critically acclaimed film 'Once Were Warriors.' He later took on the challenge of directing a James Bond film with 'Die Another Day,' bringing his unique perspective to the franchise. His ability to blend action with character-driven storytelling made his contribution to the Bond series memorable.",
            "Date Of Birth": "June 17, 1950"
        },
        "Actor": "Pierce Brosnan",
        "Genre": ["Action", "Spy", "Adventure", "Thriller"],
        "Description": "James Bond is captured and imprisoned by North Korean agents, only to be released after 14 months and determined to uncover a traitor in MI6.",
        "ImageURL": "https://www.intofilm.org/intofilm-production/scaledcropped/970x546https%3A/s3-eu-west-1.amazonaws.com/images.cdn.filmclub.org/film__13214-die-another-day--hi_res-e3428aa0.jpg/film__13214-die-another-day--hi_res-e3428aa0.jpg"
    },
    {
        "Title": "The World Is Not Enough",
        "Director": {
            "Name": "Michael Apted",
            "Bio": "Michael Apted was an English film director, producer, and screenwriter. He was born on February 10, 1941, in Aylesbury, England. Apted was known for his versatile directing career that spanned various genres, including documentary, drama, and action. He joined the James Bond film series with 'The World Is Not Enough,' bringing his unique style to the franchise. His ability to create compelling characters and narratives made a lasting impact on the film industry.",
            "Date Of Birth": "February 10, 1941"
        },
        "Actor": "Pierce Brosnan",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Mystery", "Crime Fiction"],
        "Description": "James Bond is assigned to protect an oil heiress as he uncovers a conspiracy involving nuclear weapons, betrayal, and a vengeful villain.",
        "ImageURL": "https://www.alternateending.com/wp-content/uploads/2012/10/gZcnRH6VHThnRqo04BZDWJiij8t.jpg"
    },
    {
        "Title": "Octopussy",
        "Director": {
            "Name": "John Glen",
            "Bio": "John Glen was an English film director and editor. He was born on May 15, 1932, in Sunbury-on-Thames, England. Glen had a significant impact on the James Bond film series, directing five consecutive Bond films, starting with 'For Your Eyes Only' and ending with 'Licence to Kill.' Before directing, he worked as an editor on several Bond films. Glen's contributions helped define the modern Bond film formula and maintained the series' popularity throughout the 1980s.",
            "Date Of Birth": "May 15, 1932"
        },
        "Actor": "Roger Moore",
        "Genre": ["Action", "Spy", "Adventure", "Thriller"],
        "Description": "James Bond investigates a plot involving a wealthy and enigmatic woman, smuggling, and a circus, leading him to a showdown with a nuclear bomb.",
        "ImageURL": "https://www.telegraph.co.uk/content/dam/films/2022/07/08/TELEMMGLPICT000301998984_trans_NvBQzQNjv4BqYO7_xiyF6r3HKBKXSTLIcf4Xpit_DMGvdp2n7FDd82k.jpeg"
    },
    {
        "Title": "The Man With The Golden Gun",
        "Director": {
            "Name": "Guy Hamilton",
            "Bio": "Guy Hamilton was a British film director known for his work on the James Bond film series. He was born on September 16, 1922, in Paris, France, to British parents. Hamilton directed a total of four James Bond films, including 'Goldfinger,' which is considered one of the most iconic films in the series. His direction contributed significantly to the establishment of the Bond franchise's visual style and action-packed sequences. Hamilton's impact on the spy genre and his memorable contributions to popular cinema are widely recognized.",
            "Date Of Birth": "September 16, 1922"
        },
        "Actor": "Roger Moore",
        "Genre": ["Action", "Spy", "Adventure", "Thriller"],
        "Description": "James Bond is sent to recover a solar energy weapon and must outwit the skilled assassin Francisco Scaramanga, who holds the golden bullet.",
        "ImageURL": "https://i0.wp.com/manapop.com/wp-content/uploads/2021/02/vlcsnap-2021-01-03-14h53m41s037.png?ssl=1"
    },
    {
        "Title": "A View To A Kill",
        "Director": {
            "Name": "John Glen",
            "Bio": "John Glen was an English film director and editor. He was born on May 15, 1932, in Sunbury-on-Thames, England. Glen had a significant impact on the James Bond film series, directing five consecutive Bond films, starting with 'For Your Eyes Only' and ending with 'Licence to Kill.' Before directing, he worked as an editor on several Bond films. Glen's contributions helped define the modern Bond film formula and maintained the series' popularity throughout the 1980s.",
            "Date Of Birth": "May 15, 1932"
        },
        "Actor": "Roger Moore",
        "Genre": ["Action", "Spy", "Adventure", "Thriller", "Mystery", "Crime Fiction"],
        "Description": "James Bond investigates the activities of a microchip industrialist and his plan to trigger an earthquake in Silicon Valley.",
        "ImageURL": "https://www.bondsuits.com/wp-content/uploads/2012/02/AVTAKFlannel1.png"
    }
];



//GET Requests on movies

//returns the above object array as a JSON file
app.get('/movies', (req, res) => {
    res.status(200).json(jamesBondFilms)
});


//returns data about a single film by title
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = jamesBondFilms.find( movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    }else {
        res.status(400).send('No such movie')
    }
});

//returns message below when homepage is accessed
app.get('/', (req, res) => {
    res.send('The names Bond, James Bond')
})


//returns films with a particular genre
app.get('/movies/genre/:genreTypes', (req, res) => {
    //Variable called genreTypes which stores the requested parameter
    const { genreTypes } = req.params;
    //Variable called genre equal to the film and genre inside the films list if it matches the requested parameter variable
    const matchingFilms = jamesBondFilms.filter( movie => movie.Genre.includes(genreTypes));

    //If a theres more than zero films which have the matching genre respond with the films with that genre as JSON
    if (matchingFilms.length > 0) {

        res.status(200).json(matchingFilms);
    }else {
        res.status(400).send('No such movies for the requested genre')
    }
});


//returns films with a particular actor
app.get('/movies/actor/:bondActor', (req, res) => {
    //Variable called bondActor which stores the requested parameter
    const { bondActor } = req.params;
    //Variable called matchingFilms equal to the film with the actor in
    const matchingFilms = jamesBondFilms.filter( movie => movie.Actor.includes(bondActor));

    //If a theres more than zero films which have the matching actor respond with the films with that actor as JSON
    if (matchingFilms.length > 0) {

        res.status(200).json(matchingFilms);
    }else {
        res.status(400).send('No such movies for the requested actor')
    }
});




//Returns information on a partcilcular director
app.get('/movies/director/:directorName', (req, res) => {
    //Variable called directorName which stores the requested parameter
    const { directorName } = req.params;
    //Variable called director equal to the film and genre inside the films list if it matches the requested parameter variable
    const director = jamesBondFilms.find( movie => movie.Director.Name === directorName).Director;

    //If a theres more than zero films which have the matching genre respond with the films with that director as JSON
    if (director) {

        res.status(200).json(director);
    }else {
        res.status(400).send('No such directors')
    }
});





//Users

//Adds new user to list of users 
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('Users need names')
    }

})

//Allow users to add movie to their list of favourites
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favouriteFilms.push(movieTitle)
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`)
    }else {
        res.status(400).send('no such user');
    }
  
})



//Allow users to delete movie from their list of favourites
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
   

    let user = users.find( user => user.id == id );

    if (user) {
        user.favouriteFilms = user.favouriteMovies.filter( title => title !== movieTitle) 
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`)
    }else {
        res.status(400).send('no such user');
    }
  
})


//Allow existing users to deregister
app.delete('/users/:id/', (req, res) => {
    const { id, } = req.params;
    

    let user = users.find( user => user.id == id );

    if (user) {
        user = users.find( user => user.id != id );
        res.status(200).send(` user ${id} has been deleted`)
    }else {
        res.status(400).send('no such user');
    }
  
})


//Update users by id 
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    }else {
        res.status(400).send('no such user');
    }
  
})


//returns documentation html page 
app.get('/documentation', (req, res) => {
    res.sendFile('documentation.html', {root: __dirname + '/public'});
});


//Automatically routes request for static files in the public folder
app.use(express.static('public'));


//listen for requests on port 8080
app.listen(8080, () => {
    console.log('App is listening on port 8080')
});

//error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something not working!')
})








//Old code
// //Deletes user from list by ID
// app.delete('/students/:id', (req, res) => {
//     let user = users.find((user) => {
//         return user.id === req.params.id
//     });

//     //Filters users and performs a function to return all users minus the one whose ID you specified. 
//     //(deletes it from list)
//     if (user) {
//         users = users.filter((obj) => {
//             return obj.id !== req.params.id 
//         }); 
//         res.status(201).send('User ' + req.params.id + ' was deleted')
//     }
// })

