Web Controller Generator
========================

Architecture
------------

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

##### OptionGroup #####
This attribute applies to paths. It will cause the front end to generate a radio button group for the values underneath. All values in an OptionGroup path _must_ be bools (and will be treated that way by default). If they are not the OptionGroup will be ignored and a regular path will be generated.

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

