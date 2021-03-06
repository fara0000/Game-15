function Model() {
    this._matrix = [];
    
    this._box = {
        coordinateX: 0,
        coordinateY: 0,
        value: 0
    };
    
    this._zeroBox = {
        coordinateX: 0,
        coordinateY: 0,
        value: 0
        };
    };
    
Model.prototype.getMatrix = function () {
    return this._matrix;
}

Model.prototype.setMatrix = function(array) {
    this._matrix = array;
    console.log('model set matrix', this._matrix);
}

Model.prototype.findIndex = function (value) {
    this._box.value = Number(value);
    
    for(let i = 0; i < this._matrix.length; i++) {
        for(let j = 0; j < this._matrix.length; j++) {
            if(this._matrix[i][j] === this._box.value) {
                this._box.coordinateX = i;
                this._box.coordinateY = j;
    
                return this._box;
            }
        }
    }
}
    
Model.prototype.swapElems = function (elem1, elem2) {
    this._box = elem1;
    this._zeroBox = elem2;
    
    [
        this._matrix[this._box.coordinateX][this._box.coordinateY],
        this._matrix[this._zeroBox.coordinateX][this._zeroBox.coordinateY]
    ] =
    [
        this._matrix[this._zeroBox.coordinateX][this._zeroBox.coordinateY],
        this._matrix[this._box.coordinateX][this._box.coordinateY]
    ]
    console.log(this._matrix);
    
}

export default Model;



// class Model{
// 	constructor() {
// 		this._matrix = [
// 	        [1, 2, 3, 4],
// 	        [5, 6, 7, 8],
// 	        [9, 10, 11, 12],
// 	        [13, 14, 15, 0]
// 	    ];
	    
// 	    this._box = {
// 	        coordinateX: 0,
// 	        coordinateY: 0,
// 	        value: 0
// 	    };
	    
// 	    this._zeroBox = {
// 	        coordinateX: 0,
// 	        coordinateY: 0,
// 	        value: 0
//         };
// 	}

// 	getMatrix() {
// 		return this._matrix;
// 	}

// 	setMatrix(array) {
// 		this._matrix = array;
// 	}

// 	findIndex(value) {
// 		this._box.value = Number(value);
    
// 	    for(let i = 0; i < this._matrix.length; i++) {
// 	        for(let j = 0; j < this._matrix.length; j++) {
// 	            if(this._matrix[i][j] === this._box.value) {
// 	                this._box.coordinateX = i;
// 	                this._box.coordinateY = j;
	    
// 	                return this._box;
// 	            }
// 	        }
// 	    }
// 	}

// 	swapElems(elem1, elem2) {
// 		this._box = elem1;
//     	this._zeroBox = elem2;
	    
// 	    [
// 	        this._matrix[this._box.coordinateX][this._box.coordinateY],
// 	        this._matrix[this._zeroBox.coordinateX][this._zeroBox.coordinateY]
// 	    ] =
// 	    [
// 	        this._matrix[this._zeroBox.coordinateX][this._zeroBox.coordinateY],
// 	        this._matrix[this._box.coordinateX][this._box.coordinateY]
// 	    ]
// 	} 
// }

