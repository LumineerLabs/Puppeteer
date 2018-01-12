Web Controller Generator
========================

Architecture
------------
![Web Controller Architecture](https://github.com/LumineerLabs/Web-Controller-Generator/raw/master/mdsrc/architecture.png)

### Web Client -> Web Server ###
Communication from the client to the server is handled one of two ways. The default is to send updates via AJAX calls to a REST service as the user changes values. The other is to send an update of the entire state of the data values when the user clicks a button. The method used is determined by the platform configuration.

### Web Client <- Web Server ###
Communication from the server to the client occurs when the control application updates data in the data store. This causes a Server Sent Event to be sent to the client with the updated values.

### Web Server <-> Control Application ###
This communication path is handled through a generated API for the particular platform and language binding that has been selected. Whether or not an update to the data store from the web API triggers an event handler is configurable in the target definition.

Model Files
-----------
The model files define the data that your application uses. These files are used for generating the web interface, API, data store, and language bindings. Values are defined hierarchically.

### Data ###

#### Attributes ####
There are several attributes that can be added to data definitions. They affect what controls are generated for a given value and input validation. If you want to define a value with the name of an attribute, prefix it with ^, this is the escape character.

##### Type #####
| Model Type | C/C++ Type  | Python Type |
|------------|-------------|-------------|
| uint8      | uint8_t     |             |
| uint16     | uint16_t    |             |
| uint32     | uint32_t    |             |
| uint64     | uint64_t    |             |
| int8       | int8_t      |             |
| int16      | int16_t     |             |
| int32      | int32_t     |             |
| int64      | int64_t     |             |
| f32        | float       |             |
| f64        | double      |             |
| f128       | long double |             |
| bool       | bool        |             |
| string     | wstring     |             |
| color      | uint32_t    |             |

##### Range #####
The Range attribute allows the user to specify a valid range of input values. It will also generate a slider control for integer types and floating point types with a Step value. This attribute is only valid for decimal types.

The following values define a range. They do not all need to be specified, but if step is specified, at least Min needs to be as well. Min and Max must be inside of the range that can be specified by the type of the value.

###### Min ######
The minimum value for the range.

###### Max ######
The maximum value for the range.

###### Step ######
Specifies the step the interval between valid values. This is based off the value of Min. If Max is not a multiple of Step + Min, then the last multiple of Step + Min that is less than Max is the actual maximum value for the range.

Example:
```YAML
Value1:
    Type: uint8
    Range:
        Min: 8
        Max: 250
        Step: 2
```

##### InitialValue #####
This attribute specifies the initial value this data value will have.

Example:
```YAML
Value:
    Type: uint32
    InitialValue: 65536
```

##### OptionList #####
This attribute specifies a list of valid values for this value.

Example
```YAML
ControllerOptions:
    Mode:
        Type: string
        OptionList: ["automated", "manual", "test"]
```

For non string types, a list of values can be provided using the same syntax as above. Descriptions for each value can also be provided using Value, Description pairs.

Example:
```YAML
ControllerOptions:
    Mode:
        Type: string
        OptionList: [0, 1, 2]
```

Example:
```YAML
ControllerOptions:
    Mode:
        Type: string
        OptionList: 
            - Value: 0
              Description: "automated"
            - Value: 1
              Description: "manual"
            - Value: 2
              Description: "test"
```

##### OptionGroup #####
This attribute applies to paths. It will cause the front end to generate a radio button group for the values underneath. All values in an OptionGroup path _must_ be bools (and will be treated that way by default). If they are not the OptionGroup will be ignored and a regular path will be generated.

Example:
```YAML
Path1:
    Path2:
        OptionGroup: ~
        Value1: ~
        Value2: ~
        Value3: ~
```

##### UpdateGroup #####
This attribute applies to paths. It will cause the front end to generate a group of data values that are read and updated via buttons. This is useful for editing and viewing arbitrary data that isn't part of the standard model. For example, if the controller is driving a 500x500 pixel LED array, it would not make sense to include the value of each pixel in the model. This would create 250,000 individual values in the webpage. Using the UpdateGroup attribute an individual pixel can be addressed and its value retrieved or modified.

Example:
```YAML
Path1:
    Path2:
        UpdateGroup: ~
        x:
            type: uint16
        y:
            type: uint16
        color:
            type: color

```

#### Paths ####
Data values are defined hierarchically. Nodes can either be paths or values. A path node cannot be treated as a value.

Example:
```YAML
Path1:
    Path2:
        Value1:
            Type: bool
        Value2:
            Type: string
    Value3:
        Type: uint8
```

In the example above there are 3 data values that have been defined. They would be accessed as follows:
```C++
bool val1 = static_cast<DataValue<bool>>(data["Path1"]["Path2"]["Value1"]).read();
static_cast<DataValue<wstring>>(data["Path1"]["Path2"]["Value2"]).write("foobar");
static_cast<DataValue<uint8_t>>(data["Path1"]["Value3"]).write(8);
```

### Target ###
The target file is a separate YAML file that defines target specific parameters.

#### Platform ####
This parameter specifies the target platform to generate the server code for. This can be something like a Python SimpleHTTPServer implementation or something like a baremetal HTTP server running on an ESP32.

Example:
```YAML
Target:
    Platform: ESP32
```

##### Binding #####
If the platform supports alternate language bindings, the preferred binding can be specified with this parameter. For example, if generating a Python SimpleHTTPServer implementation, the generator might support binding to code written in another language (e.g. wrappers for C/C++ Python extensions).

Example:
```YAML
Target:
    Platform: SimpleHTTPServer
    Binding: C++
```

#### LiveUpdate ####
This parameter specifies whether or not the webpage will send updates to the server as the user changes values. If set to True, any change will result in an update getting sent to the server as the value is changed. If set to False, a button will be generated that allows the user to select when to send the update. Because this is so related to performace, the platform generator can disallow live updates.

Example:
```YAML
Target:
    Platform: ESP32
    LiveUpdate: True
```

#### UpdateEvent ####
This parameter specifies whether or not to use an event model when the data store is updated via the web API. If set to True, it will invoke event handlers. If set to False (the default), the application is expected to poll the values for updates.

Example:
```YAML
Target:
    Platform: ESP32
    LiveUpdate: True
    UpdateEvent: True
```
