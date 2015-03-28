var mugl = {
    "window" : {
        "margin"      : INTEGER, // pixel size of window margin
        "padding"     : INTEGER, // pixel size of window padding
        "border"      : INTEGER, // pixel size of window border
        "bordercolor" : COLOR // color to use when drawing window border
    },
    "plotarea": {
        "marginbottom" : INTEGER, // pixel size of plotarea bottom margin
        "marginleft"   : INTEGER, // pixel size of plotarea left margin
        "marginright"  : INTEGER, // pixel size of plotarea right margin
        "margintop"    : INTEGER // pixel size of plotarea top margin
    },
    "legend": { // may also be true/false
        "anchor"     : [INTEGER,INTEGER], // coordinates of legend anchor point
        "base"       : [INTEGER,INTEGER], // coordinates of legend base point
        "border"     : INTEGER, // pixel size of legend border
        "icon": {
            "border" : INTEGER, // pixel size of border to draw around legend icons
            "height" : INTEGER, // pixel height of legend icons
            "width"  : INTEGER // pixel width of legend icons
        },
        "position"   : [INTEGER,INTEGER], // coordinates of legend position
        "rows"       : INTEGER, // number of rows to use in legend
        "columns"    : INTEGER, // number of columns to use in legend
        "visible"    : BOOLEAN, // whether to draw legend at all
        "frame"      : FRAME, // frame of reference for base
        "color"      : COLOR, // background color of legend
        "opacity"    : DOUBLE, // legend background opacity
        "bordercolor": COLOR, // color to use when drawing border
        "padding"    : INTEGER
    },

    "data": [
        {
            "filter"  : "threshold-count",
            "options" : {
                "in-period"    : "1D",
                "out-period"   : "1M",
                "in-variable"  : "max_temp",
                "op"           :  ">=",
                "threshold"    :  90
            },
            "variables" : {
                {
                    "id": STRING
                    "type": "datetime"
                    "source": STRING
                },
                {
                    "id": "temp",
                    "type": "number"
                },
            },
        },
        {
            "service": {
                "location": "http://crndata.multigraph.org/data/1026/SOLARAD,SUR_TEMP,WINDSPD/"
            },
            "variables": [
                {
                    "id": "time_1h",
                    "type": "datetime"
                },
                {
                    "id": "solarad",
                    "type": "number"
                },
                {
                    "id": "sur_temp",
                    "type": "number"
                },
                {
                    "id": "windspd",
                    "type": "number"
                }
            ]
        },
        {
            "service": {
                "location": "http://crndata.multigraph.org/data/1026/T5,P5/"
            },
            "variables": [
                {
                    "id": "time_5m",
                    "type": "datetime"
                },
                {
                    "id": "temp"
                },
                {
                    "id": "precip"
                }
            ]
        }
    ],
    "filter": {
        "distance": 5
    },
    "horizontalaxis": {
        "binding": {
            "id": "timebinding",
            "max": "2009011216",
            "min": "2009011116"
        },
        "grid": true,
        "id": "time",
        "labels": {
            "anchor": [0,1],
            "angle": 0,
            "label": [
                {
                    "format": "%d %n %Y",
                    "spacing": ["2M","1M","7D","5D","2D"]
                },
                {
                    "format": "%H:00 %d %n %Y",
                    "spacing": ["24H","12H","6H","3H","2H","1H"]
                },
                {
                    "format": "%H:%i %d %n %Y",
                    "spacing": ["30m","15m","10m","5m","1m"]
                }
            ]
        },
        "max": "2015-03-04-08-00",
        "min": "2015-03-01-08-00",
        "position": [0,0],
        "title": false,
        "type": "datetime"
    },
    "non-plots": [
        {
            "horizontalaxis": {
                "time": "time_1h"
            },
            "legend": {
                "label": "Solar Radiation"
            },
            "options": {
                "fillcolor": "#ffaaaa",
                "linecolor": "#990000"
            },
            "style": "fill",
            "verticalaxis": {
                "solarad": "solarad"
            }
        },
        {
            "horizontalaxis": {
                "time": "time_5m"
            },
            "legend": {
                "label": "Precip"
            },
            "options": {
                "baroffset": 0,
                "barwidth": "5m",
                "fillcolor": "green",
                "linecolor": "black"
            },
            "style": "bar",
            "verticalaxis": {
                "precip": "precip"
            }
        },
        {
            "horizontalaxis": {
                "time": "time_1h"
            },
            "legend": {
                "label": "Wind Speed"
            },
            "options": {
                "linecolor": "black",
                "linewidth": "1",
                "pointcolor": "black",
                "pointoutlinecolor": "black",
                "pointsize": "1"
            },
            "style": "pointline",
            "verticalaxis": {
                "windspd": "windspd"
            }
        }
    ],
    "plots": [
        {
            "horizontalaxis": {
                "time": "time_5m"
            },
            "legend": {
                "label": "Temperature"
            },
            "options": {
                "linecolor": "blue",
                "linewidth": "1",
                "pointcolor": "blue",
                "pointoutlinecolor": "blue",
                "pointsize": "1"
            },
            "style": "pointline",
            "verticalaxis": {
                "temp": "temp"
            }
        }
    ],
    "throttle": {
        "concurrent": 1,
        "pattern": "^http://crndata.multigraph.org",
        "period": 1000,
        "requests": 1
    },
    "verticalaxes": [
        {
            "base": [-1,-1],
            "binding": {
                "id": "tempbinding",
                "max": 1,
                "min": 0
            },
            "id": "temp",
            "labels": {
                "anchor": [1,0],
                "angle": 0,
                "format": "%.1f",
                "position": [-10,0],
                "spacing": [50,20,10,5,2,1,0.1,0.01],
                "start": 0
            },
            "max": 20.5,
            "min": 0,
            "position": [0,0],
            "title": {
                "anchor": [0,-1],
                "angle": 90,
                "position": [-45,0],
                "text": "Temperature (C)"
            },
            "type": "number"
        },
        {
            "base": [1,-1],
            "binding": {
                "id": "precipbinding",
                "max": 1,
                "min": 0
            },
            "id": "precip",
            "labels": {
                "anchor": [-1,0],
                "angle": 0,
                "format": "%.1f",
                "position": [5,0],
                "spacing": [50,20,10,5,2,1,0.1,0.01],
                "start": 0
            },
            "max": 10.1,
            "min": 0,
            "pan": false,
            "position": [0,0],
            "title": {
                "anchor": [0,1],
                "angle": 90,
                "position": [25,0],
                "text": "Precip (mm)"
            },
            "type": "number",
            "zoom": {
                "anchor": 0
            }
        },
        {
            "base": [1,-1],
            "binding": {
                "id": "solaradbinding",
                "max": 1,
                "min": 0
            },
            "id": "solarad",
            "labels": {
                "anchor": [-1,0],
                "angle": 0,
                "format": "%1d",
                "position": [5,0],
                "spacing": [1000,500,200,50,20,10,5,2,1,0.1,0.01],
                "start": 0
            },
            "max": 1100,
            "min": 0,
            "pan": false,
            "position": [60,0],
            "title": {
                "anchor": [0,1],
                "angle": 90,
                "position": [35,0],
                "text": "Solar Radiation (W/m^2)"
            },
            "type": "number",
            "zoom": {
                "anchor": 0
            }
        },
        {
            "base": [1,-1],
            "binding": {
                "id": "windspdbinding",
                "max": 1,
                "min": 0
            },
            "id": "windspd",
            "labels": {
                "anchor": [-1,0],
                "angle": 0,
                "format": "%.1f",
                "position": [5,0],
                "spacing": [1000,500,200,50,20,10,5,2,1,0.1,0.01],
                "start": 0
            },
            "max": 15,
            "min": 0,
            "pan": false,
            "position": [120,0],
            "title": {
                "anchor": [0,1],
                "angle": 90,
                "position": [35,0],
                "text": "Wind (m/s)"
            },
            "type": "number",
            "zoom": {
                "anchor": 0
            }
        }
    ],
}
