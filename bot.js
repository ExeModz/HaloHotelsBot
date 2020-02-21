// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him



const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NjgwMzMzNTQyNTkyNjEwMzA0.Xk-YIA.ZOMWlbMHBKW10rZuVHVUbQQyJZU";

client.login(token)
 
var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_12262FBE5E9BEB244DB73D9DC5F5B9A1644762F76664C10CD3A376F39AC3D986F0497C596349D82FEF4DBC5B6951F1BD7E0B4A5AED8BB1F70233B0D2A77A41F2969FF8671F6D9A5BC84C89AF0B477D51F134AED19596EECBB32292BCB0811E954AE8B5E91D15D74E90F32A9EBF452691147BC9A102FE6A4783EE64C8BCC6F081832130CDE32C25FFC03B28C65B492DD32244619129F7FE1781A4E0B53E57D2CED26D2C89595A7549E97F97E2AEBAAD17095BC1E48DCCA71C0AC69EE14F1DE4207199F056F360F8F0737044A70C4CCD8419BA79772222C85592161C21D0AFECBF5D20E0328A70828CBEE5C1F400D5BB1D57F2EBB35C0FFAFC27A66CDBAE37FF61E41DCB91BDA49C8D5D24838E28DAB89C123751382343FE5FCDF950F895597C64294CC340";
var prefix = '!';
var groupId = 5602780;
var maximumRank = 150;

function login() {
    return roblox.cookieLogin(cookie);
}

login() // Log into ROBLOX
    .then(function() { // After the function has been executed
        console.log('Logged in.') // Log to the console that we've logged in
    })
    .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
        console.log(`Login error: ${error}`) // Log the error to console if there is one.
    });
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
 
client.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
   
    if(isCommand('setrank', message)){
       if(!message.member.roles.some(r=>["8 | Chief Executive Officer"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("You can't use this command.");
        var username = args[1]
        var rankIdentifier = Number(args[2]) ? Number(args[2]) : args[2];
        if (!rankIdentifier) return message.channel.send("Please enter a rank");
        if (username){
            message.channel.send(`Checking ROBLOX for ${username}`)
            roblox.getIdFromUsername(username)
            .then(function(id){
                roblox.getRankInGroup(groupId, id)
                .then(function(rank){
                    if(maximumRank <= rank){
                        message.channel.send(`${id} is rank ${rank} and not promotable.`)
                    } else {
                        message.channel.send(`${id} is rank ${rank} and promotable.`)
                        roblox.setRank(groupId, id, rankIdentifier)
                        .then(function(newRole){
                            message.channel.send(`Changed rank to ${newRole.name}`)
                        }).catch(function(err){
                            console.error(err)
                            message.channel.send("Failed to change rank.")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("Couldn't get that player in the group.")
                });
            }).catch(function(err){
                message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
           });
       } else {
           message.channel.send("Please enter a username.")
       }
       return;
   }
})
