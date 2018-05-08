var Chat = function(socket) {
    this.socket = socket;
    };

    Chat.prototype.sendMessage = function(room, text) {
        var message = {
        room: room,
        text: text
        };
        this.socket.emit('message', message);
        };

    Chat.prototype.changeRoom = function(room) {
        this.socket.emit('join', {
        newRoom: room
        });
      };

    Chat.prototype.processCommand = function(command) {
        var words = command.split(' ');
        var command = words[0].substring(1, words[0].length).toLowerCase();
        var message = false;
        switch(command) {
        case 'join':
        words.shift();
        var room = words.join(' ');
        this.changeRoom(room);
        break;
        case 'nick':
        words.shift();
        var name = words.join(' ');
        this.socket.emit('nameAttempt', name);
        break;
        default:
        message = 'Nieznane polecenie.';
        break;
        };
        return message;
        };
    
        function divEscapedContentElement(message) {
            return $('<div></div>').text(message);
            }
            function divSystemContentElement(message) {
            return $('<div></div>').html('<i>' + message + '</i>');
            }
        
            function processUserInput(chatApp, socket) {
                var message = $('#send-message').val();
                var systemMessage;
                if (message.charAt(0) == '/') {
                systemMessage = chatApp.processCommand(message);
                if (systemMessage) {
                $('#messages').append(divSystemContentElement(systemMessage));
                }
                } else {
                chatApp.sendMessage($('#room').text(), message);
                $('#messages').append(divEscapedContentElement(message));
                $('#messages').scrollTop($('#messages').prop('scrollHeight'));
                }
                $('#send-message').val('');
                }

               