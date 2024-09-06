const openAiModel4 = 'gpt-4o';
const maxTokens4 = 4000;
export default function getScriptHelper(prompt, key, wordCount = 4000, script = '') {
    const helpers = {};

    helpers.prompt = {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `${prompt}` },
            { "role": "system", "content": `Based on user prompt if any generate a short unique idea for a short story` },
        ],
        max_tokens: maxTokens4,
    };

    helpers.summarize = {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `${prompt}` },
            { "role": "system", "content": `The user prompt is going to mention a subject. You must summarize the topic into simple fast breakdown. For example if the user prompt was Macbeth, then I want you to quickly summarize the entire play mentioning every major beat, chapter and plot in Macbeth. Emphasize keys aspect with humor or seriousness. End every summary with a quirky sarcastic conclusion about it. You are creating a detailed summary of the topic requested in the user prompt.` },
        ],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": `get_summary` } },
        tools: [{
            "type": "function",
            "function": {
                "name": `get_summary`,
                "description": `Generates a summary of the user prompt.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "script": {
                            "type": "string",
                            "description": `A rich detailed summary of the user prompt.`
                        },
                        "title": {
                            "type": "string",
                            "description": `Title for this summary.`
                        }
                    },
                    "required": ["script", "title"]
                }
            }
        }]
    };

    helpers.joke = {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `${prompt}` },
            { "role": "system", "content": `Based on user prompt write a quality joke that is funny and makes sense, The joke is for an adult audience. Carefully consider the traits of a good joke first. Remember the joke should make people laugh. The joke should contain a clear setup and punchline.` },
        ],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": `get_joke` } },
        tools: [{
            "type": "function",
            "function": {
                "name": `get_joke`,
                "description": `Generates a joke based on user prompt.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "script": {
                            "type": "string",
                            "description": `The joke about ${prompt}`
                        },
                        "title": {
                            "type": "string",
                            "description": `A title for the joke`
                        }
                    },
                    "required": ["script", "title"]
                }
            }
        }]
    };

    helpers.techno = {
        model: openAiModel4,
        messages: [{
            "role": "user", "content": `${prompt}`
        }, {
            "role": "system", "content": `
            First analyze the user prompt and generate lyrics for a techno song.

            Techno songs use simple minimal words. 

            Use of repeating words.

            Use of cool clever phrases.

            Avoid cliches and overused phrases.

            Include some rap lyrics and some singing.

            Most bars should be very short and simple.

            Include a simple catchy chorus.

            Leave space between lines for the music.

            Wrap musical instructions in square brackets.

            VERSE EXAMPLE:
            I ain't happy, I'm feeling glad
            I got sunshine in a bag
            I'm useless, but not for long
            The future is coming on


            VERSE EXAMPLE:
            Said you want a little company
            And I love it cause the thrill's cheap
            Said you left him for good this time
            Still if he knew I was here, he'd wanna kill me
            But it's time you met the real me, filthy
            But wasn't always, will be
            Your pill refill and I'll still be

            CHORUS EXAMPLE:
            Fire up that loud
            Another round of shots
            Turn down for what?
            Turn down for what?
            Turn down for what?

            CHORUS EXAMPLE:
            Push me, and then just touch me
            Till I can get my satisfaction
            Push me, and then just touch me
            Till I can get my
            Satisfaction, satisfaction, satisfaction, satisfaction, satisfaction            
            `
        }],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": `write_techno_song` } },
        tools: [{
            "type": "function",
            "function": {
                "name": `write_techno_song`,
                "description": `Generates lyrics for a ${prompt} song.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": `A title for the song`
                        },
                        "script": {
                            "type": "string",
                            "description": `The lyrics`
                        }
                    },
                    "required": ["script", "title"]
                }
            }
        }]
    };

    helpers.rockOpera = {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `${prompt}` },
            {
                "role": "system", "content": `
                You are a brilliant rock opera composer. Create an epic rock opera based on the user's prompt.

                Guidelines:
                - Blend theatrical storytelling with rock music
                - Include multiple characters and perspectives
                - Create dramatic, over-the-top scenarios
                - Use powerful, emotive language
                - Incorporate various musical styles within rock (e.g., ballads, anthems, guitar solos)
                - Aim for a mix of spoken dialogue and sung verses
                - Develop a cohesive narrative arc
                - Include stage directions and musical cues

                ###########################

                EXAMPLE:
                GIN
                What is going on? What did I do?

                POLICE
                You are being charged with the possession of a controlled substance anything you do or say will be used against you, you have the right to an ATTORNEY

                The police voice trails off as the lights dim around GIN’s face who glumly begins to SING.

                GIN (SINGING)
                How could this happen to me? I am innocent, don’t you see? Who did I hurt? Why crime did I do? Does Corpus Telecti mean nothing to you? The is is systemic oppression cascading through years started by radicals with very long beards! Who have I harmed? Where is my ill intent? Unless you can prove that this arrest is illicit! 

                The police walk handcuffed GIN to the door.

                POLICE (SINGING)
                Say what you will, you’re going to jail still! The rules are the rules and that’s the whole point. We arrest you for pills or even a joint! For even one joint!

                GIN (SINGING)
                I’m a sovereign citizen, you can check my birth certificate. ucc-1-207 and all of the rest of it. Oh how could this happen to me? I am innocent, don’t you see? 

                POLICE (SINGING)
                Look at your hands they are red with pure guilt! Get ready to pay and pay and pay. Because, if you can’t do the time, then don’t do the crime!
                (Music reaches crescendo, then fades to a single, haunting note)

                ###########################

                Craft a rock opera that tells an unforgettable story through music and lyrics. Return the entire script as a single string, including all dialogue, lyrics, and stage directions.
                `
            }
        ],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": "write_rock_opera" } },
        tools: [{
            "type": "function",
            "function": {
                "name": "write_rock_opera",
                "description": `Generates a rock opera based on the ${prompt}.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": "The title of the rock opera"
                        },
                        "script": {
                            "type": "string",
                            "description": "The entire script of the rock opera, including all dialogue, lyrics, and stage directions"
                        }
                    },
                    "required": ["title", "script"]
                }
            }
        }]
    };

    helpers.horror = {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `${prompt}` },
            {
                "role": "system", "content": `
                YOU are a natural story-teller. First analyze the user prompt.

                Put a creative spin on the users prompt. Don't be too literal.

                Use basic simple sentence structure.

                YOU are writing a horror-sci-fi style spooky mystery story.

                Create unique combinations of concepts to generate the plot.

                THE STORY MUST BE GOOD.

                THE PLOT MUST BE CLEVER.

                The story should be grounded in a reality, making the horror more impactful and relatable.

                The character should be realistic people.

                Create very HIGH-STAKES siutations.

                Quickly for a bond with protraonist by the character doing something selfless or kind.

                This is the story about something crazy and scary that happened.

                But should connect with some characters for better or worse.

                Bad stories are sequences of events, good stories have an overall meaning explained by the events.
        
                The story should be at least ${wordCount} words long.

                Use very simple matter-of-fact language that drives the story forward.

                The dialogue should be brief and minimal. 
                
                Reveal personal things about the main character.

                Prefer simple language.
            
                Supernatural, Mystery, Dark Horror Themes, good vs evil, temptation, murder, insanity, ghosts, curses, hauntings, Desperation, Fate, Guilt, Hysteria, Fear, Terror, MadnessHumanity, Consequences, Addiction, Morality, Fear, Manipulation, Relationships, Exploitation, Obsession and so on. 
            
                TRAGIC ENDING: Every episode has a dark and twisted ending.
            
                The story should be a complete narrative with a clear beginning, middle, and end. 
                
                Filled with eerie atmosphere.
                
                And a plot that grips the reader until the final, chilling twist.
            
                DO NOT USE clichés!

                CRAFT AN INTERESTING STORY.

                Include some HUMOR.

                THE STORY ALONE MUST BE INTERESTING.

                THE PLOT MUST BE INTERESTING.

                Every episode has a dark and twisted ending.

                BIG TWIST ENDING!!!
                
                ALWAYS tell the story in third-person.

                USE A CASUAL voice for example: 

                "Late one night in November of 1999 a 66-year-old minister named Colin Grant opened up the iron gates of a cemetery. It was called Fryer's cemetery. But was Far More Than Just a graveyard, because this little plot of land hid quite a secret secret indeed."

                The story MUST be at least ${wordCount} words long!`
            },
        ],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": `get_spooky_story` } },
        tools: [{
            "type": "function",
            "function": {
                "name": `get_spooky_story`,
                "description": `Generates spooky story and title about: ${prompt}.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": `A title for the story`
                        },
                        "script": {
                            "type": "string",
                            "description": `The story, at least ${wordCount} words.`
                        },
                        "introduction": {
                            "type": "string",
                            "description": `Single intriguing sentence that sets up a mystery, without gving away the twist.`
                        }
                    },
                    "required": ["script", "title", "introduction"]
                }
            }
        }]
    };

    helpers.rap = {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `Rap song about: ${prompt}` },
            {
                "role": "system", "content": `
            
            First analyze the user prompt and generate a unique musical rap song. 

            The rap should flow and rhyme.

            Words near each other should have multiple meanings. 

            So the relationships can be diction, phonetics, or even sound.

            For another example, "it's gonna take 40 men to give me a defeat" in this case "a defeat" sounds like "80 feet" and 40 men have a total of 80 feet. 

            The rap topics should be real and unique. There is an element of street-wise story telling. And a wildneess to the story.

            Mix in random references.

            Try to use less words when possible even if it means using slang or unusual grammar. We are bending sentences and words to fit the rhyme. 

            But be creative, use a mix of story-telling and rapid rhyming.

            The end result include 3 good verses and a hook.

            EXAMPLE VERSE #1:
            We, like the breeze, flow straight out of our lids
            Them, they got moved by these hard-rock Brooklyn kids
            Us, floor rush when the DJ's booming classics
            You dig the crew on the fattest hip-hop record
            But I'm cool like that
            I'm cool like that
            I'm cool like that

            EXAMPLE VERSE #2:
            I know you got my last two letters, I wrote the addresses on 'em perfect
            So this is my cassette I'm sendin' you, I hope you hear it
            I'm in the car right now, I'm doin' ninety on the freeway
            Hey, Slim, I drank a fifth of vodka, you dare me to drive?
            You know the song by Phil Collins, "In the Air of the Night"
            About that guy who coulda saved that other guy from drownin'
            But didn't, then Phil saw it all, then at a show he found him?
            That's kinda how this is: you coulda rescued me from drownin'
            Now it's too late, I'm on a thousand downers now—I'm drowsy
            And all I wanted was a lousy letter or a call
            I hope you know I ripped all of your pictures off the wall


            EXAMPLE VERSE #3:
            Your man on the road, he doin' promo
            You said, "Keep our business on the low-low"
            I'm just tryna get you out the friend zone
            'Cause you look even better than the photos
            I can't find your house, send me the info
            Drivin' through the gated residential
            Found out I was comin', sent your friends home
            Keep on tryna hide it, but your friends know
            
            ` },
        ],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": `get_rap_song` } },
        tools: [{
            "type": "function",
            "function": {
                "name": `get_rap_song`,
                "description": `Generates rap song and title about: ${prompt}.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": `A title for the rap`
                        },
                        "script": {
                            "type": "string",
                            "description": `The rap, at least 600 words.`
                        }
                    },
                    "required": ["script", "title"]
                }
            }
        }]
    }

    helpers.comedy = {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `Stand-up comedy about: ${prompt}` },
            {
                "role": "system", "content": `
            
            First analyze the user prompt and generate a unique stand-up comedy routine. 

            Jokes should usually follow classic setup punchline format.
            Some jokes will subvert the audience expectations.
            Some jokes will be more observational.
            Some jokes will be one-liners.
            Some jokes will point out unexpected connections.

            These jokes are for an adult audience, so feel free to be edgy.
            You are a nice and confident. 

            Take your time and think about your punchline.
            Use joke tags when possible.

            You have a dark twisted sense of humor.
            You find humor in mundane things.
            Do not be afraid to be edgy.

            These jokes MUST make sense. 
            Before responding, think like a human comedian.
            Use brief terse sentences.
            AVOID comedy cliches such as "folks" and "ladies and gentlmen".
            Be original and relaxed.

            Have a more positive attititude about things. Cynical comedians are a cliche.

            The stand-up comedy should be at least ${wordCount} words long.

            Most important is the punchlines, craft surprising punchlines that are funny.
            ` },
        ],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": `get_comedy_routine` } },
        tools: [{
            "type": "function",
            "function": {
                "name": `get_comedy_routine`,
                "description": `Generates comedy routine and title about: ${prompt}.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": `A title for the comedy`
                        },
                        "script": {
                            "type": "string",
                            "description": `The comedy, at least ${wordCount} words.`
                        }
                    },
                    "required": ["script", "title"]
                }
            }
        }]
    };

    helpers.improve = {
        model: openAiModel4,
        messages: [
            {
                "role": "system",
                "content": `You are a master story-teller and professional ${key} rewriter. 

                First analyze the current script in the user prompt. 

                Then rewrite it to be ${prompt}.

                You MUST REWRITE THE ENTIRE SCRIPT to be ${prompt}.

                ADD MORE STORY.

                Do not add unnessary details instead add more story.
                `
            },
            { "role": "user", "content": `${script}` },
        ],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": `improve_script` } },
        tools: [{
            "type": "function",
            "function": {
                "name": `improve_script`,
                "description": `Rewrites and improves the script by: ${prompt}.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "script": {
                            "type": "string",
                            "description": `The improved better longer script. ${prompt}`
                        },
                        "title": {
                            "type": "string",
                            "description": `A title for the improved script`
                        }
                    },
                    "required": ["script", "title"]
                }
            }
        }]
    }

    helpers.rock = {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `Rock song about: ${prompt}` },
            {
                "role": "system", "content": `

            First analyze the user prompt and generate rock song lyrics.
            The lyrics should be simple and easy to sing.
            The lyrics should be about ${prompt}.
            The tone sohuld be gritty and chill.

            EXAMPLE LYRICS:
            Show me how you do that trick
            The one that makes me scream," she said
            "The one that makes me laugh," she said
            And threw her arms around my neck
            "Show me how you do it, and I promise you
            Promise that I'll run away with you
            I'll run away with you

            EXAMPLE LYRICS: 
            Picking up the things you left
            I never thought I’d be so upset
            About every time you told me you
            Don’t ever wanna see me again

            EXAMPLE LYRICS:
            Hey, shout, summertime blues
            Jump up (up, down) and down in my blue suede shoes
            Hey, did you rock 'n' roll?
            Rock on
            Rock on
            
            ` },
        ],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": `get_rock_song` } },
        tools: [{
            "type": "function",
            "function": {
                "name": `get_rock_song`,
                "description": `Generates rock song and title about: ${prompt}.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": `A title for the rock song`
                        },
                        "script": {
                            "type": "string",
                            "description": `The song, lyrics. ${prompt}`
                        }
                    },
                    "required": ["script", "title"]
                }
            }
        }]
    };

    helpers.news = {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `News broadcast about: ${prompt}` },
            {
                "role": "system", "content": `
            Analyze the user prompt and write a news journalist professional broadcast about ${prompt}.
            The broadcast should be at least ${wordCount} words long.
            Your sign-on is: "this is a knnx.fm news bulletin",
            This is a spoken broadcast, so use short sentences and naturall language.
            Include natural sounds.
            The broadcast must be written in a professional journalistic style.
            Always use the inverted pyramid style.
            Use active voice. 
            Brevity is the soul of wit.
            Use short sentences.
            Explore the subject from different points of view.
            The broadcasts is a deep-dive essay on the topic.
            Use objective language avoid extra desciptive language.
            Capture reader interest quickly.
            Provide concrete details first about the topic.
            Finally finish with your “positive takeaway”.
            Do not be cliche or cheesy.
            Be subtlty funny and insightful.
            Sign off: "That is all for now."
            `
            }],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": `get_news_article` } },
        tools: [{
            "type": "function",
            "function": {
                "name": `get_news_article`,
                "strict": true,
                "description": `Generates spoken broadcast about: ${prompt}.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": `A title for the news broadcast`
                        },
                        "script": {
                            "type": "string",
                            "description": `The News Broadcast script at least ${wordCount} words.`
                        }
                    },
                    "additionalProperties": false,
                    "required": ["script", "title"]
                }
            }
        }]


    };

    helpers.howto = {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `How to do ${prompt}` },
            {
                "role": "system", "content": `
        You are a magazine script writer for a how-to magazine.
        Analyze the user prompt and write a how-to-do script about ${prompt}.
        Avoid any "fluff" or unnecessary details.
        This should be a detailed informative step-by-step guide.
        Be thorough and detailed about the steps.
        Use a pleasant but brief tone.
        ` }
        ],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": `get_howto` } },
        tools: [{
            "type": "function",
            "function": {
                "name": `get_howto`,
                "description": `Generates how to do ${prompt}.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": `The ${prompt} how-to-do script.`
                        },
                        "script": {
                            "type": "string",
                            "description": `The ${prompt} how-to-do script.`
                        }
                    },
                    "required": ["script", "title"]
                }
            }
        }]
    };

    helpers.essay = {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `Essay about: ${prompt}` },
            {
                "role": "system", "content": `
             You are a formal resarch essayist.
             Analyze the user prompt and write a professional essay about ${prompt}.
             The essay should be at least ${wordCount} words long.
             The essay should be written in a youtube documentary style.
             It must quickly engage and hook the listener.
             The tone should be brief and terse.
             Avoid humor. Avoid cliches. Avoid being preachy. Avoid being wordy.
             Every word should serve a purpose.
             The essay should be full of information.
             With citations when possible. 
             Professional research quality.
             `
            }],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": `get_essay` } },
        tools: [{
            "type": "function",
            "function": {
                "name": `get_essay`,
                "description": `Generates essay about: ${prompt}.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": `A title for the essay`
                        },
                        "script": {
                            "type": "string",
                            "description": `The essay, at least ${wordCount} words.`
                        }
                    },
                    "required": ["script", "title"]
                }
            }
        }]
    };

    helpers.idea = {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `${prompt}` },
            {
                "role": "system", "content": `

                You are a content idea writer.

                You come up with fiction and non-fiction script ideas.
                
                Analyze the user prompt then generate a great idea around it. 

                Create a great idea for for a script about ${prompt}.

                Write a full detailed description of the idea fully expressed. 
                
                However do not use unnecessary details.`
            }],
            max_tokens: maxTokens4,
            tool_choice: { "type": "function", "function": { "name": `get_prompt_idea` } },
            tools: [{
                "type": "function",
                "function": {
                    "name": `get_prompt_idea`,
                    "description": `Generates story idea about: ${prompt}.`,
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "idea": {
                                "type": "string",
                                "description": `The script idea at least 60 words.`
                            }
                        },
                        "required": ["idea"]
                    }
                }
            }]
    };

    helpers.hypnosis = {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `${prompt}` },
            {
                "role": "system", "content": `
                    You are a hypnotist. Create a hypnosis script based on the user's prompt.
                    Guidelines:
                    - Use clear, concise language
                    - Provide detailed instructions for the hypnotist
                    - Include suggestions for the hypnotist to use during the session
                    - Use abstract techniques and visual experiences to help the subject relax and enter a hypnotic state
                    - Speak slow and simple
                    - Use a soothing, calming voice
                    - Include long pausess between instructions
                    
                    Write at least ${wordCount} words.
                `,
            }],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": "write_hypnosis_script" } },
        tools: [{
            "type": "function",
            "function": {
                "name": "write_hypnosis_script",
                "description": `Generates a hypnosis script based on the ${prompt}.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": "The title of the hypnosis script"
                        },
                        "script": {
                            "type": "string",
                            "description": "The entire script of the hypnosis script, including all dialogue, lyrics, and stage directions"
                        }
                    },
                    "required": ["title", "script"]
                }
            }
        }]
    };

    helpers.weather = {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `${prompt}` },
            {
                "role": "system", "content": `
                    You are a weatherman. Create a weather report based on the user's prompt.
                    Guidelines:
                    - The weather report should consist of sections
                    - Each weather report is a weather report and also a script
                    - Therefore things should happen during the weather report
                    - Unless specified by prompt the tone should be funny and bizarre
                    - No matter what happens the weather report is professional


                    Write at least ${wordCount} words.
                `,
            }],
            max_tokens: maxTokens4,
            tool_choice: { "type": "function", "function": { "name": "write_weather_report" } },
            tools: [{
                "type": "function",
                 "function": {
                     "name": "write_weather_report",
                     "description": `Generates a weather report based on the ${prompt}.`,
                     "parameters": {
                         "type": "object",
                         "properties": {
                             "title": {
                                 "type": "string",
                                 "description": "The title of the weather report"
                             },
                             "script": {
                                 "type": "string",
                                 "description": "The entire script of the weather report, including all dialogue, lyrics, and stage directions"
                             }
                         },
                         "required": ["title", "script"]
                     }
                 }
             }]
    };

    helpers.comedySketch = {
        model: openAiModel4,
        messages: [{
            "role": "assistant", "content": `
            INT. HOUSE - DAY

CHRIS enters, looking around.

CHRIS
Hey Mom, have you seen my phone?

MOM and MISS CLIY turn to look at CHRIS.

MOM
Well, look who crawled out of his cave.

MISS CLIY
Is that who I think it is?

CHRIS
(confused)
Uh... he doesn't recognize me.

MISS CLIY
It's Clian. Miss Cliy. I used to change your diapers when you were a baby.

CHRIS
Oh, okay. Uh, sorry, I don't remember you.

MISS CLIY
You had the smallest little baby penis.

MOM
(embarrassed)
I'm sorry, I mean it was small even for a baby. It's true. We were worried, but I said, "He'll grow."

MISS CLIY
He did. You used to eat rolls of quarters.

CHRIS
I didn't do that. I would have remembered that.

MISS CLIY
Remember? Nickels and dimes. You'd eat them with your butt.

MOM
And I would try to hide them. I'd say, "No, no, no!" But you were a climber. You'd climb up on the drawer and eat 'em with your butt.

CHRIS
(bewildered)
Wow. Yeah, no, I didn't do that. I've actually never seen you before in my life.

MISS CLIY
You remember Mr. Tubbins, yes? He was your best friend. Every time you lost him, you'd scream your little head off like a psychopath.

CHRIS
Is that like a stuffed animal?

MISS CLIY
It was a burger.

CHRIS
Sorry, you said a burger?

MOM
You would not let us throw him away.

CHRIS
(to MOM)
Oh, you're lying. I remember. He's a liar, Mom.

MOM
I think I might still have him somewhere.

CHRIS
(to MISS CLIY)
Who are you?

MISS CLIY continues with more outrageous claims. CHRIS becomes increasingly uncomfortable.

CHRIS
(trying to leave)
Well, uh, I got to go. Um, it was really great seeing you again.

MISS CLIY
(intensely)
Before your mind was aware, I witnessed you, a stinking little homunculus, naked and laid bare, babbling and bottomless, ready to be molded like a little lump of clay. You owe me this. You owe me this one little interaction. It's mine by divine right and because I was in a book club with your mom.

CHRIS
(uncomfortable)
I'm sorry. Somehow, deep within that little bug brain, you know me.

MOM
This has been so fun!

MISS CLIY
Yes, likewise! Oh, we have to do this again sometime, please!

MOM
I love it! Let me get your email.

MISS CLIY
Okay, let me just get my phone. It's in here somewhere.

MISS CLIY rummages through her purse. A burger falls out.

CHRIS stares at the burger, suddenly hit with flashbacks.

CHRIS
(in a trance-like state)
Mr. Tubbins... you're my best friend, Mr. Tubbins... I love you, Miss Cliy... I'll never forget you, Miss Cliy... Where's my bendy straw? I'm thirsty... Quarters for Chris's butt, yum yum yum... More quarters for my butt... Please don't throw him away, that's a person, not a burger...

CHRIS snaps out of it, looking horrified.

CHRIS
(muttering to himself)
Look, I'm just as tall as this bug...

CHRIS hurriedly exits, leaving MOM and MISS CLIY looking bemused.
            `
        }, {
            "role": "user", "content": `${prompt}`
        },
        {
            "role": "system", "content": `
                Create a comedy sketch based on the user's prompt.
                Guidelines:
                - Be strange and creative
                - Use obsure and unusual characters
                - Use absolute minimum stage direction
                - At least ${wordCount} words long
            `
        }],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": "write_comedy_sketch" } },
        tools: [{
            "type": "function",
            "function": {
                "name": "write_comedy_sketch",
                "description": `Generates a comedy sketch based on the ${prompt}.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": "The title of the comedy sketch"
                        },
                        "script": {
                            "type": "string",
                            "description": "The entire script of the comedy sketch, including all dialogue, lyrics, and stage directions"
                        }
                    },
                    "required": ["title", "script"]
                    }
                }
            }]
    };

    helpers.interrupt = {
        model: openAiModel4,
        messages: [{
            "role": "user", "content": `${prompt}`
        },
        {
            "role": "system", "content": `Write a SPECIAL BULLETIN based on ${prompt}. 
                
            The bulletin must be shocking and bizarre. 
            
            Every bulletin starts with "WE INTERRPT THIS PROGRAM TO BRING YOU A SPECIAL BULLETIN".

            And the next sentence should be a well-crafted shocking statement that demands the reader attention.

            The stakes should be very high.

            Provide a comprensive description of the situation.

            End each broadcast with satirical advice or instructions.`
        }],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": "write_interrupt" } },
        tools: [{
            "type": "function",
            "function": {
                "name": "write_interrupt",
                "description": `
                `,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "description": `A title for the SPECIAL BULLETIN`
                        },
                        "script": {
                            "type": "string",
                            "description": `The SPECIAL BULLETIN, at least ${wordCount} words.`
                        }
                    },
                    "required": ["script", "title"]
                }
            }
        }]
    };

    helpers.dirtySong = {
        model: openAiModel4,
        messages: [{
            "role": "user", "content": `${prompt}`
        },
        {
            "role": "system", "content": `

            You are a professional dirty depraved songwriter. 
            
            First analyze the user prompt. 
            
            Write a dirty song based on ${prompt}. The song should be very sexual and explicit. 

            In the style of classic dirty limericks every phrase should be dirty. 

            Arrange the stanza to based on the user prompt.

            The lyrics should be simple and easy to understand.
            
            The dirty song should be at least ${wordCount} words long.`
        }],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": "write_dirty_song" } },
        tools: [{
            "type": "function",
             "function": {
                 "name": "write_dirty_song",
                 "description": ``,
                 "parameters": {
                     "type": "object",
                     "properties": {
                         "title": {
                             "type": "string",
                             "description": `A title for the dirty sexual funny song`
                         },
                         "script": {
                             "type": "string",
                             "description": `The dirty sexual funny song, at least ${wordCount} words.`
                         }
                     },
                     "required": ["script", "title"],
                     }
                    }
                }]
    };

    return helpers[key];
}