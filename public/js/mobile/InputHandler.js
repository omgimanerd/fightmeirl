function InputHandler(socket){
    
}

InputHandler.PUNCH = false;
InputHandler.KICK = false;
InputHandler.LEFT = false;
InputHandler.RIGHT = false;
InputHandler.UP = false;
InputHandler.DOWN = false;

InputHandler.apply = function(socket){
    $('#A').on('mousedown', function(e){
            this.PUNCH = true;
    });
    $('#A').on('mouseup', function(e){
            this.PUNCH = false;
    });
    $('#B').on('mousedown', function(e){
            this.KICK = true;
    });
    $('#B').on('mouseup', function(e){
            this.KICK = false;
    });
    $('#left').on('mousedown', function(e){
            this.LEFT = true;
    });
    $('#left').on('mouseup', function(e){
            this.LEFT = false;
    });
    $('#right').on('mousedown', function(e){
            this.RIGHT = true;
    });
    $('#right').on('mouseup', function(e){
            this.RIGHT = false;
    });
    $('#up').on('mousedown', function(e){
            this.UP = true;
    });
    $('#up').on('mouseup', function(e){
            this.UP = false;
    });
    $('#down').on('mousedown', function(e){
            this.DOWN = true;
    });
    $('#down').on('mouseup', function(e){
            this.DOWN = false;
    });
    
    
}