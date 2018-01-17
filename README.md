Puppeteer
=========
Puppeteer generates web interfaces for controlling and monitoring software running on remote devices. It is designed to focus on embedded devices and applications. For an already supported platform the user simply specifies some information about the data interface and the target platform they want to run it on and Puppeteer will take care of the rest.

Architecture
------------
### Controller Architecture ###
![Web Controller Architecture](https://github.com/LumineerLabs/Web-Controller-Generator/raw/master/mdsrc/architecture.png)

### Web Client -> Web Server ###
Communication from the client to the server is handled one of two ways. The default is to send updates via AJAX calls to a REST service as the user changes values. The other is to send an update of the entire state of the data values when the user clicks a button. The method used is determined by the platform configuration.

### Web Client <- Web Server ###
Communication from the server to the client occurs when the control application updates data in the data store. This causes a Server Sent Event to be sent to the client with the updated values.

### Web Server <-> Control Application ###
This communication path is handled through a generated API for the particular platform and language binding that has been selected. Whether or not an update to the data store from the web API triggers an event handler is configurable in the target definition.

### Code Generation Architecture ###
![Generator Architecture](https://github.com/LumineerLabs/Web-Controller-Generator/raw/master/mdsrc/generator_architecture.png)

To generate a web controller the user needs to define a model file and target file. The model file contains descriptions of all of the data values that can be viewed and controlled via the web controller. The target file describes the platform the webserver will run on and the binding to the control application. The generator will combine the values in these files with templates for each part of the controller and generate the appropriate files for deployment to the target. The definitinos in the target file map to the templates. The generator is generic, relying on templates to provide all target and language specific code. Thus, adding a new target is as simple as adding new templates and referencing it in a target file.

Model Files
-----------
The model files define the data that your application uses. These files are used for generating the web interface, API, data store, and language bindings. Values are defined hierarchically.

### System Title ###
The first YAML key is the system's title. Other keys parallel to the sysstem title in the hierarchy will be ignored.

Example:
```YAML
Voltage Monitor: ~
```

### Data ###
A data value represents some value in an application on the server that can be displayed and potentially controlled via the web interface. Each is given a name. The default type is int32.

Example:
```YAML
Voltage Monitor:
    Voltages:
        Voltage_1: ~
        Voltage_2: ~
        Voltage_3: ~
    Status:
        ADC_1: ~
        ADC_2: ~
        Application: ~
        CPU: ~
```

#### Attributes ####
There are several attributes that can be added to data definitions. They affect what controls are generated for a given value and input validation. If you want to define a value with the name of an attribute, prefix it with ^, this is the escape character.

##### Type #####
Types are fixed width wherever possible. 

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

[comment]: # (What other types do we want to add here? location mapping to google maps? image? video? external resources?)

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

##### ReadOnly #####
When set to True his attribute marks a value as read only. It will make the front end just display the value and will provide no mechanisms for remotey modifying it. If not specified, this defaults to False.

Example:
```YAML
voltage_1:
    ReadOnly: True
```

##### History #####
This attribute specifies that the server should maintain historical data. The system will maintain a record of each time the value changed and when it was changed (nanoseconds since boot).

Example:
```YAML
voltage_1:
    Type: f32
    History: ~
```

###### Depth ######
The attribute specifies number of samples to keep on the server. If not specified, this defaults to 256.

Example:
```YAML
voltage_1:
    Type: f32
    History:
        Depth: 512
```

###### TimeWindow ######
This attribute specifies the amount of history to view in seconds. If this is not specified, the graph will display any data that presented by the server. If ClientHistoryDepth is not specified, the client will automatically store any samples not older than the value specified in TimeWindow. If it is specified, the client will limit the number of samples to the value specified.

Example:
```YAML
voltage_1:
    Type: f32
    History:
        Depth: 512
        TimeWindow: 30
```

###### ClientHistoryDepth ######
This attritube specifies how much additional history to store on the client. If set to 0, the client will only display the history depth as given by the server. If set to any other value, the total history on the client will be the server history depth + the value specified here.

```YAML
voltage_1:
    Type: f32
    History:
        Depth: 512
        ClientHistoryDepth: 4096
```

###### GraphID ######
This attribute specifies and identifier that can be used to group multiple values' histories onto a single graph. The settings for the graph display will be pulled from the first History defintion with a given graph ID.

Example:
```YAML
voltage_1:
    Type: f32
    History:
        GraphID: Voltages
voltage_2:
    Type: f32
    History:
        GraphID: Voltages
```

##### OptionList #####
This attribute specifies a list of valid values for this value. It will cause a combo box to be generated.

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

##### Tabs #####
This attribute specifies whether or not to generate a tab control for each of the paths specified under it. When set to true, the generator will use each of the next level paths as the name of a tab for display. Values under those paths will be hidden unless that tab is selected. When set to false, all values under a path are viewed on the same page separated and labeled just by text. If not specified, this defaults to false.

Example:
```YAML
Path1:
    Tabs: true
    Paths2:
        Value1: ~
        Value2: ~
    Paths3:
        Value1: ~
        Value2: ~
```

##### LinkToNewPage #####
This attribute specifies whether or not to include the values under this path in the current page. If set to true, a new page will be generated for anything under this path. When set to false, all values under this path are included in the current page. If not specified, this defaults to false.

Example:
```YAML
Path1:
    Paths2:
        LinkToNewPage: true
        Value1: ~
        Value2: ~
    Paths3:
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
