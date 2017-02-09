[![Build Status](https://travis-ci.org/RobinBuschmann/soap-typescript.png?branch=master)](https://travis-ci.org/RobinBuschmann/soap-typescript)

# soap-decorators
SOAP decorators for creating wsdl's and annotating services to provide metadata for [node-soap](https://github.com/vpulim/node-soap).

## Installation
```
npm install soap-decorators --save
```

## Usage

### Input and output messages
Define input and output message interfaces for a soap service.
```typescript
import {XSDComplexType, XSDElement} from 'soap-decorators';

@XSDComplexType
export class CalculatorInput {

  @XSDElement
  a: number;

  @XSDElement
  b: number;
}

@XSDComplexType
export class CalculatorResult {

  @XSDElement
  value: number;
}
```
For a more advanced usage of creating xsd schemas with decorators 
see xsd-decorators.

### Soap service and operations
Define soap service, its operations and specify input and output 
messages via the previously defined classes.
```typescript
import {SoapService, SoapOperation} from 'soap-decorators';

@SoapService({
  portName: 'CalculatorPort',
  serviceName: 'CalculatorService'
})
export class CalculatorController {

  @SoapOperation(CalculatorResult)
  add(data: CalculatorInput, req: (res: CalculatorResult) => any): void {

    req({
      value: data.a + data.b
    });
  }

  @SoapOperation(CalculatorResult)
  subtract(data: CalculatorInput, req: (res: CalculatorResult) => any): void {

    req({
      value: data.a - data.b
    });
  }
}
```

### Use soap service with express.js
*soap-decorators* provides a middleware for express, which does
all the magic for you. The wsdl will be resolved and the location 
address and tns will be set automatically.
```typescript
import {soap} from 'soap-decorators';

const app = express();
const calculatorController = new CalculatorController();

// resolves wsdl for you and sets location address and tns to current requested url
app.use('/soap/calculation', soap(calculatorController));
```

### Requesting WSDL
Now you can ask for the **wsdl** by requesting against the defined
endpoint.
```
GET /soap/calculation?wsdl
```
*Response*
```xml
<?xml version='1.0' encoding='UTF-8'?>
<wsdl:definitions xmlns:soap='http://schemas.xmlsoap.org/wsdl/soap/' 
                  xmlns:xsd='http://www.w3.org/2001/XMLSchema' 
                  xmlns:wsdl='http://schemas.xmlsoap.org/wsdl/' 
                  name='CalculatorService' 
                  targetNamespace='https://calculation.example.com'
                  xmlns:tns='https://calculation.example.com'>
    <wsdl:types>
        <xsd:schema attributeFormDefault='unqualified' elementFormDefault='unqualified' xmlns:xsd='http://www.w3.org/2001/XMLSchema' targetNamespace='https://calculation.example.com'>
            <xsd:element name='add' type='tns:CalculatorInput'/>
            <xsd:element name='CalculatorResult' type='tns:CalculatorResult'/>
            <xsd:element name='subtract' type='tns:CalculatorInput'/>
            <xsd:complexType name='CalculatorInput'>
                <xsd:sequence>
                    <xsd:element name='a' type='xsd:int'/>
                    <xsd:element name='b' type='xsd:int'/>
                </xsd:sequence>
            </xsd:complexType>
            <xsd:complexType name='CalculatorResult'>
                <xsd:sequence>
                    <xsd:element name='value' type='xsd:int'/>
                </xsd:sequence>
            </xsd:complexType>
        </xsd:schema>
    </wsdl:types>
    <wsdl:message name='addMessage'>
        <wsdl:part name='add' element='tns:add'/>
    </wsdl:message>
    <wsdl:message name='CalculatorResultMessage'>
        <wsdl:part name='CalculatorResult' element='tns:CalculatorResult'/>
    </wsdl:message>
    <wsdl:message name='subtractMessage'>
        <wsdl:part name='subtract' element='tns:subtract'/>
    </wsdl:message>
    <wsdl:portType name='CalculatorPortType'>
        <wsdl:operation name='add'>
            <wsdl:input message='tns:addMessage'/>
            <wsdl:output message='tns:CalculatorResultMessage'/>
        </wsdl:operation>
        <wsdl:operation name='subtract'>
            <wsdl:input message='tns:subtractMessage'/>
            <wsdl:output message='tns:CalculatorResultMessage'/>
        </wsdl:operation>
    </wsdl:portType>
    <wsdl:binding name='CalculatorServiceBinding' type='tns:CalculatorPortType'>
        <soap:binding style='document' transport='http://schemas.xmlsoap.org/soap/http'/>
        <wsdl:operation name='add'>
            <wsdl:input>
                <soap:body use='literal' parts='add'/>
            </wsdl:input>
            <wsdl:output>
                <soap:body use='literal' parts='CalculatorResult'/>
            </wsdl:output>
            <soap:operation soapAction='add'/>
        </wsdl:operation>
        <wsdl:operation name='subtract'>
            <wsdl:input>
                <soap:body use='literal' parts='subtract'/>
            </wsdl:input>
            <wsdl:output>
                <soap:body use='literal' parts='CalculatorResult'/>
            </wsdl:output>
            <soap:operation soapAction='subtract'/>
        </wsdl:operation>
    </wsdl:binding>
    <wsdl:service name='CalculatorService'>
        <wsdl:port name='CalculatorPort' binding='tns:CalculatorServiceBinding'>
            <soap:address location='https://calculation.example.com/soap/v1'/>
        </wsdl:port>
    </wsdl:service>
</wsdl:definitions>
```
### Using operations
```xml
POST /soap/calculation

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cal="https://calculation.example.com">
   <soapenv:Header/>
   <soapenv:Body>
      <cal:add>
         <a>3</a>
         <b>1</b>
      </cal:add>
   </soapenv:Body>
</soapenv:Envelope>
```
```xml
POST /soap/calculation

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cal="https://calculation.example.com">
   <soapenv:Header/>
   <soapenv:Body>
      <cal:subtract>
         <a>8</a>
         <b>4</b>
      </cal:subtract>
   </soapenv:Body>
</soapenv:Envelope>
```
*Response*
```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://localhost:3000/calculation">
   <soap:Body>
      <CalculatorResult>
         <value>4</value>
      </CalculatorResult>
   </soap:Body>
</soap:Envelope>
```
### Retrieving WSDL from class or instance
```typescript
import {createWsdl} from 'soap-decorators';

const instance = new CalculatorController();

createWsdl(instance) === createWsdl(CalculatorController);
```

## Limitations
Complex type annotated classes can currently only work as interfaces.
So that the data, which gets passed to a soap operation, is not mapped
to the corresponding complex type annotated class. That means that
```typescript

  @SoapOperation(CalculatorResult)
  add(data: CalculatorInput, req: (res: CalculatorResult) => any): void {

    console.log(data instanceof CalculatorInput); // => false !!
  }
```