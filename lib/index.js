// Add generateSector() method to the CLI sandbox environment

function checkRoomName(roomName) {
    var roomRegex = /^(E|W)([0-9]{1,2})(N|S)([0-9]{1,2})$/g
    var nameMatch = roomRegex.exec(roomName);
    return nameMatch;
    if (nameMatch !== null) {
        sandbox.print('Room Name: '+nameMatch[1]+' - '+nameMatch[2]+' - '+nameMatch[3]+' - '+nameMatch[4]);
    }
}

module.exports = function(config) {
    // console.log(config);
    if(config.cli) {
        var oldCallback = config.cli.onCliSandbox;
        config.cli.onCliSandbox = function(sandbox) {
            oldCallback(sandbox);
//            console.log(sandbox);
//            sandbox.test = function() {
//                sandbox.print('This is the test!');
//                return 'Test result';
//            };
            var storage = sandbox.storage;
            var tools = sandbox.tools;
            var map = sandbox.map;
            map.clearRow = function(roomName, direction) {
                var nameMatch = checkRoomName(roomName);
                if (nameMatch !== null) {
                    sandbox.print('Room Name: '+nameMatch[1]+' - '+nameMatch[2]+' - '+nameMatch[3]+' - '+nameMatch[4]);
                    var x = parseInt(nameMatch[2]);
                    var y = parseInt(nameMatch[4]);
                    for (let i = 0 ; i <= 10 ; i++) {
                        var clearRoom = "";
                        if (direction == "n" || direction == "N" || direction == "north" || direction == "NORTH") {
                            clearRoom = nameMatch[1]+x+nameMatch[3]+(y+i);
                        } else if (direction == "s" || direction == "S" || direction == "south" || direction == "SOUTH") {
                            clearRoom = nameMatch[1]+x+nameMatch[3]+(y+i);
                        } else if (direction == "e" || direction == "E" || direction == "east" || direction == "EAST") {
                            clearRoom = nameMatch[1]+(x+i)+nameMatch[3]+y;
                        } else if (direction == "w" || direction == "W" || direction == "west" || direction == "WEST") {
                            clearRoom = nameMatch[1]+(x+i)+nameMatch[3]+y;
                        }
                        map.removeRoom(clearRoom);
                        sandbox.print('Clearing Room: '+clearRoom);
                    }
                }
            };
            map.generateRow = function(roomName, direction) {
                var nameMatch = checkRoomName(roomName);
                if (nameMatch !== null) {
                    sandbox.print('Room Name: '+nameMatch[1]+' - '+nameMatch[2]+' - '+nameMatch[3]+' - '+nameMatch[4]);
                    var x = parseInt(nameMatch[2]);
                    var y = parseInt(nameMatch[4]);
                    for (let i = 0 ; i <= 10 ; i++) {
                        var roomName = "";
                        var c = 0;
                        var posX = x;
                        var posY = y;
                        if (direction == "n" || direction == "N" || direction == "north" || direction == "NORTH") {
                            roomName = nameMatch[1]+x+nameMatch[3]+(y+i);
                            posY = (y+i) % 10;
                        } else if (direction == "s" || direction == "S" || direction == "south" || direction == "SOUTH") {
                            roomName = nameMatch[1]+x+nameMatch[3]+(y+i);
                            posY = (y+i) % 10;
                        } else if (direction == "e" || direction == "E" || direction == "east" || direction == "EAST") {
                            roomName = nameMatch[1]+(x+i)+nameMatch[3]+y;
                            posX = (x+i) % 10;
                        } else if (direction == "w" || direction == "W" || direction == "west" || direction == "WEST") {
                            roomName = nameMatch[1]+(x+i)+nameMatch[3]+y;
                            posX = (x+i) % 10;
                        }
                        let roomType = "regular";
                        if (posX===0 || posX % 10 === 0 || posY===0 || posY % 10 === 0) {
                            roomType = "highway";
                        } else if (posX == 5 && posY == 5) {
                            roomType = "center";
                        } else if ((posX==4 || posX == 5 || posX == 6) && (posY==4 || posY == 5 || posY == 6)) {
                            roomType = "keeper";
                        }
                        let roomOptions = {};
                        if (roomType == "regular") {
                        } else if (roomType == "highway") {
                            roomOptions.terrainType = 1;
                            roomOptions.swampType = 1;
                            roomOptions.sources = 0;
                            roomOptions.controller = false;
                            roomOptions.mineral = false;
                        } else if (roomType == "center") {
                            roomOptions.sources = 3;
                            roomOptions.controller = false;
                            roomOptions.keeperLairs = false;
                        } else if (roomType == "keeper") {
                            roomOptions.sources = 3;
                            roomOptions.controller = false;
                            roomOptions.keeperLairs = true;
                        }
                        map.generateRoom(roomName, roomOptions);
                        sandbox.print('Generating Room: '+roomName+" of type "+roomType);
                    }
                }
            };
            map.clearSector = function(roomName) {
                var nameMatch = checkRoomName(roomName);
                var count = 0;
                if (nameMatch !== null) {
                    for (let i = 0 ; i <= 10 ; i++) {
                        for (let c = 0 ; c <= 10 ; c++) {
                            let roomName = nameMatch[1]+(parseInt(nameMatch[2])+i)+nameMatch[3]+(parseInt(nameMatch[4])+c);
                            map.removeRoom(roomName);
                            sandbox.print('Clearing Room: '+roomName);
                        }
                    }
                }
                return 'Rooms Cleared: '+count;
            };
            map.generateSector = function(roomName) {
                var nameMatch = checkRoomName(roomName);
                var count = 0;
                if (nameMatch !== null) {
                    for (let i = 0 ; i <= 10 ; i++) {
                        for (let c = 0 ; c <= 10 ; c++) {
                            let roomType = "regular";
                            if (i===0 || i % 10 === 0 || c===0 || c % 10 === 0) {
                                roomType = "highway";
                            } else if (i == 5  && c == 5) {
                                roomType = "center";
                            } else if ((i==4 || i == 5 || i == 6) && (c==4 || c == 5 || c == 6)) {
                                roomType = "keeper";
                            }
                            let roomName = nameMatch[1]+(parseInt(nameMatch[2])+i)+nameMatch[3]+(parseInt(nameMatch[4])+c);
                            let roomOptions = {};
                            if (roomType == "regular") {
                            } else if (roomType == "highway") {
                                roomOptions.terrainType = 1;
                                roomOptions.swampType = 1;
                                roomOptions.sources = 0;
                                roomOptions.controller = false;
                                roomOptions.mineral = false;
                            } else if (roomType == "center") {
                                roomOptions.sources = 3;
                                roomOptions.controller = false;
                                roomOptions.keeperLairs = false;
                            } else if (roomType == "keeper") {
                                roomOptions.sources = 3;
                                roomOptions.controller = false;
                                roomOptions.keeperLairs = true;
                            }
                            map.generateRoom(roomName, roomOptions);
                            sandbox.print('Generating Room: '+roomName+" of type "+roomType);
                            count++;
                        }
                    }
                }
                return 'Rooms Recreated: '+count;
            };
            map.checkCenterRoom = function(roomName) {
                // console.log('STORAGE:', sandbox.storage);
                var nameMatch = checkRoomName(roomName);
                let x = parseInt(nameMatch[2]) % 10;
                let y = parseInt(nameMatch[4]) % 10;
                let db = sandbox.storage.db;
                // console.log(sandbox.storage);
                if ((x==4 || x == 5 || x == 6) && (y==4 || y==5 || y==6)) {
                    db['rooms.objects'].findOne({ $and: [{ type: 'mineral'}, {room: roomName}] })
                    .then((mineral) => {
                        sandbox.print('Mineral:' +JSON.stringify(mineral));
                        db['rooms.objects'].findOne({ $and: [{ type: 'extractor'},  {room: roomName}] })
                        .then((extractor) => {
                            if (extractor == null) {
                                db['rooms.objects'].insert({ type: 'extractor', x: mineral.x, y: mineral.y, room: roomName});
                                sandbox.print('Adding Extractor: '+mineral.x+' - '+mineral.y+' - '+roomName);
                            } else {
                                sandbox.print('Already has Extractor!');
                            }
                        });
                    });
                }
            };
            map.checkSectorResources = function(roomName) {
                var nameMatch = checkRoomName(roomName);
                if (nameMatch !== null) {
                    for (let i = 0 ; i <= 10 ; i++) {
                        for (let c = 0 ; c <= 10 ; c++) {
                            if ((i==4 || i == 5 || i == 6) && (c==4 || c == 5 || c == 6)) {
                                let roomName = nameMatch[1]+(parseInt(nameMatch[2])+i)+nameMatch[3]+(parseInt(nameMatch[4])+c);
                                map.checkCenterRoom(roomName);
                            }
                        }
                    }
                }
            };
            return sandbox;
        }
    }
};
