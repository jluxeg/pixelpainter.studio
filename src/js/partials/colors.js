//ordered list of named html colors.
const colors = [
	//grayscale
	{
		"name": "Black",
		"hex": "000000"
	},
	{
		"name": "DimGray",
		"hex": "696969"
	},
	{
		"name": "Gray",
		"hex": "808080"
	},
	{
		"name": "DarkGray",
		"hex": "A9A9A9"
	},
	{
		"name": "Silver",
		"hex": "C0C0C0"
	},
	{
		"name": "LightGray",
		"hex": "D3D3D3"
	},
	{
		"name": "Gainsboro",
		"hex": "DCDCDC"
	},
	{
		"name": "WhiteSmoke",
		"hex": "F5F5F5"
	},
	{
		"name": "White",
		"hex": "FFFFFF"
	},
	{
		"name": "Transparent",
		"hex": ""
	},
	//red
	{
		"name": "Maroon",
		"hex": "800000"
	},
	{
		"name": "DarkRed",
		"hex": "8B0000"
	},
	{
		"name": "FireBrick",
		"hex": "B22222"
	},
	{
		"name": "Crimson",
		"hex": "DC143C"
	},
	{
		"name": "Red",
		"hex": "FF0000"
	},
	//orange
	{
		"name": "OrangeRed",
		"hex": "FF4500"
	},
	{
		"name": "DarkOrange",
		"hex": "FF8C00"
	},
	{
		"name": "Orange",
		"hex": "FFA500"
	},
	//yellow
	{
		"name": "DarkGoldenRod",
		"hex": "B8860B"
	},
	{
		"name": "GoldenRod",
		"hex": "DAA520"
	},
	{
		"name": "PaleGoldenRod",
		"hex": "EEE8AA"
	},
	{
		"name": "LemonChiffon",
		"hex": "FFFACD"
	},
	{
		"name": "LightGoldenRodYellow",
		"hex": "FAFAD2"
	},
	{
		"name": "Gold",
		"hex": "FFD700"
	},
	{
		"name": "Yellow",
		"hex": "FFFF00"
	},
	//yellow-green
	{
		"name": "Olive",
		"hex": "808000"
	},
	{
		"name": "DarkKhaki",
		"hex": "BDB76B"
	},
	{
		"name": "Khaki",
		"hex": "F0E68C"
	},
	{
		"name": "DarkOliveGreen",
		"hex": "556B2F"
	},
	{
		"name": "OliveDrab",
		"hex": "6B8E23"
	},
	{
		"name": "YellowGreen",
		"hex": "9ACD32"
	},
	//green
	{
		"name": "DarkGreen",
		"hex": "006400"
	},
	{
		"name": "Green",
		"hex": "008000"
	},
	{
		"name": "ForestGreen",
		"hex": "228B22"
	},
	{
		"name": "LimeGreen",
		"hex": "32CD32"
	},
	{
		"name": "LawnGreen",
		"hex": "7CFC00"
	},
	{
		"name": "GreenYellow",
		"hex": "ADFF2F"
	},
	{
		"name": "Lime",
		"hex": "00FF00"
	},
	{
		"name": "Chartreuse",
		"hex": "7FFF00"
	},
	//blue-green
	{
		"name": "SeaGreen",
		"hex": "2E8B57"
	},
	{
		"name": "MediumSeaGreen",
		"hex": "3CB371"
	},
	{
		"name": "MediumSpringGreen",
		"hex": "00FA9A"
	},
	{
		"name": "SpringGreen",
		"hex": "00FF7F"
	},
	{
		"name": "DarkSeaGreen",
		"hex": "8FBC8B"
	},
	{
		"name": "LightGreen",
		"hex": "90EE90"
	},
	{
		"name": "PaleGreen",
		"hex": "98FB98"
	},
	{
		"name": "DarkSlateGray",
		"hex": "2F4F4F"
	},
	{
		"name": "Teal",
		"hex": "008080"
	},
	{
		"name": "DarkCyan",
		"hex": "008B8B"
	},
	{
		"name": "CadetBlue",
		"hex": "5F9EA0"
	},
	{
		"name": "LightSeaGreen",
		"hex": "20B2AA"
	},
	{
		"name": "MediumTurquoise",
		"hex": "48D1CC"
	},
	{
		"name": "PaleTurquoise",
		"hex": "AFEEEE"
	},
	{
		"name": "MediumAquaMarine",
		"hex": "66CDAA"
	},
	{
		"name": "Aquamarine",
		"hex": "7FFFD4"
	},
	{
		"name": "DarkTurquoise",
		"hex": "00CED1"
	},
	{
		"name": "Turquoise",
		"hex": "40E0D0"
	},
	{
		"name": "Cyan/Aqua",
		"hex": "00FFFF"
	},
	{
		"name": "SteelBlue",
		"hex": "4682B4"
	},
	{
		"name": "SlateGray",
		"hex": "708090"
	},
	{
		"name": "LightSlateGray",
		"hex": "778899"
	},
	{
		"name": "LightSteelBlue",
		"hex": "B0C4DE"
	},
	//blue
	{
		"name": "Navy",
		"hex": "000080"
	},
	{
		"name": "DarkBlue",
		"hex": "00008B"
	},
	{
		"name": "MediumBlue",
		"hex": "0000CD"
	},
	{
		"name": "Blue",
		"hex": "0000FF"
	},
	{
		"name": "MidnightBlue",
		"hex": "191970"
	},
	{
		"name": "DodgerBlue",
		"hex": "1E90FF"
	},
	{
		"name": "DeepSkyBlue",
		"hex": "00BFFF"
	},
	{
		"name": "LightSkyBlue",
		"hex": "87CEFA"
	},
	{
		"name": "SkyBlue",
		"hex": "87CEEB"
	},
	{
		"name": "LightBlue",
		"hex": "ADD8E6"
	},
	{
		"name": "PowderBlue",
		"hex": "B0E0E6"
	},
	//blue-purple
	{
		"name": "RoyalBlue",
		"hex": "4169E1"
	},
	{
		"name": "CornflowerBlue",
		"hex": "6495ED"
	},
	{
		"name": "DarkSlateBlue",
		"hex": "483D8B"
	},
	{
		"name": "SlateBlue",
		"hex": "6A5ACD"
	},
	{
		"name": "MediumSlateBlue",
		"hex": "7B68EE"
	},
	//purple
	{
		"name": "Indigo",
		"hex": "4B0082"
	},
	{
		"name": "RebeccaPurple",
		"hex": "663399"
	},
	{
		"name": "MediumPurple",
		"hex": "9370DB"
	},
	{
		"name": "Purple",
		"hex": "800080"
	},
	{
		"name": "DarkViolet",
		"hex": "9400D3"
	},
	{
		"name": "BlueViolet",
		"hex": "8A2BE2"
	},
	{
		"name": "DarkOrchid",
		"hex": "9932CC"
	},
	{
		"name": "MediumOrchid",
		"hex": "BA55D3"
	},
	{
		"name": "Orchid",
		"hex": "DA70D6"
	},
	{
		"name": "Violet",
		"hex": "EE82EE"
	},
	{
		"name": "Plum",
		"hex": "DDA0DD"
	},
	{
		"name": "Thistle",
		"hex": "D8BFD8"
	},
	//pink
	{
		"name": "DarkMagenta",
		"hex": "8B008B"
	},
	{
		"name": "Magenta/Fuchsia",
		"hex": "FF00FF"
	},
	{
		"name": "MediumVioletRed",
		"hex": "C71585"
	},
	{
		"name": "DeepPink",
		"hex": "FF1493"
	},
	{
		"name": "HotPink",
		"hex": "FF69B4"
	},
	{
		"name": "PaleVioletRed",
		"hex": "DB7093"
	},
	{
		"name": "LightPink",
		"hex": "FFB6C1"
	},
	{
		"name": "Pink",
		"hex": "FFC0CB"
	},
	//peachy-brown
	{
		"name": "RosyBrown",
		"hex": "BC8F8F"
	},
	{
		"name": "IndianRed",
		"hex": "CD5C5C"
	},
	{
		"name": "LightCoral",
		"hex": "F08080"
	},
	{
		"name": "Salmon",
		"hex": "FA8072"
	},
	{
		"name": "Brown",
		"hex": "A52A2A"
	},
	{
		"name": "Tomato",
		"hex": "FF6347"
	},
	{
		"name": "Coral",
		"hex": "FF7F50"
	},
	{
		"name": "SaddleBrown",
		"hex": "8B4513"
	},
	{
		"name": "Sienna",
		"hex": "A0522D"
	},
	{
		"name": "DarkSalmon",
		"hex": "E9967A"
	},
	{
		"name": "LightSalmon",
		"hex": "FFA07A"
	},
	{
		"name": "PeachPuff",
		"hex": "FFDAB9"
	},
	{
		"name": "Chocolate",
		"hex": "D2691E"
	},
	{
		"name": "Peru",
		"hex": "CD853F"
	},
	{
		"name": "SandyBrown",
		"hex": "F4A460"
	},
	{
		"name": "Tan",
		"hex": "D2B48C"
	},
	{
		"name": "BurlyWood",
		"hex": "DEB887"
	},
	{
		"name": "NavajoWhite",
		"hex": "FFDEAD"
	},
	{
		"name": "Wheat",
		"hex": "F5DEB3"
	},
	{
		"name": "Moccasin",
		"hex": "FFE4B5"
	},
	{
		"name": "Cornsilk",
		"hex": "FFF8DC"
	},
	{
		"name": "Bisque",
		"hex": "FFE4C4"
	},
	{
		"name": "BlanchedAlmond",
		"hex": "FFEBCD"
	},
	{
		"name": "PapayaWhip",
		"hex": "FFEFD5"
	},
	{
		"name": "AntiqueWhite",
		"hex": "FAEBD7"
	},
	//off-whites
	{
		"name": "Ivory",
		"hex": "FFFFF0"
	},
	{
		"name": "Snow",
		"hex": "FFFAFA"
	},
	{
		"name": "LavenderBlush",
		"hex": "FFF0F5"
	},
	{
		"name": "MistyRose",
		"hex": "FFE4E1"
	},
	{
		"name": "SeaShell",
		"hex": "FFF5EE"
	},
	{
		"name": "FloralWhite",
		"hex": "FFFAF0"
	},
	{
		"name": "OldLace",
		"hex": "FDF5E6"
	},
	{
		"name": "Linen",
		"hex": "FAF0E6"
	},
	{
		"name": "LightYellow",
		"hex": "FFFFE0"
	},
	{
		"name": "Beige",
		"hex": "F5F5DC"
	},
	{
		"name": "HoneyDew",
		"hex": "F0FFF0"
	},
	{
		"name": "LightCyan",
		"hex": "E0FFFF"
	},
	{
		"name": "MintCream",
		"hex": "F5FFFA"
	},
	{
		"name": "Azure",
		"hex": "F0FFFF"
	},
	{
		"name": "AliceBlue",
		"hex": "F0F8FF"
	},
	{
		"name": "GhostWhite",
		"hex": "F8F8FF"
	},
	{
		"name": "Lavender",
		"hex": "E6E6FA"
	}
]