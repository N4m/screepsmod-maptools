# screepsmod-maptools

## This adds tools for map manipulation

[![NPM info](https://nodei.co/npm/screepsmod-maptools.png?downloads=true)](https://npmjs.org/package/screepsmod-maptools)

# Installation 

1. `npm install screepsmod-maptools` in your screeps server folder.
2. Thats it!

# Usage
1. Open the steam screeps client
2. In console, run `map.clearRow('W0N0', 'N')` to remove rooms W0N0 to W0N10
3. In console, run `map.generateRow('W0N0', 'N')` to generate rooms W0N0 to W0N10
4. In console, run `map.generateSector('E0N0')` to generate a new sector from E0N0 to E10N10
5. In console, run `map.checkSectorResources('E0N0')` to check rooms from E0N0 to E10N10 for center rooms and create extractors where necessary
