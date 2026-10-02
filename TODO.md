Priority
    - We have the `@pydantic/monty` library, should implement a scripting engine module in NestJS application
        - We will need to update the entity to store user python scripts, 
        - We should also define a generic interface that allows developer to define what tools will be exposed to scripting engine bridge at runtime, this allows different engines with different bridge functions exposed. Should do this in a general purpose way

Non-Priority
    - We also have the `needle-rs` library, we can use this to create an AI module which will pull a `Needle 2` model, this model can receive user input and execute various application functions as tool calls.