# SL MK III Template SYSEX

# Offsets
```
0x00: Enable
  0x00: Disabled
  0x01: Enabled

0x01-0x09: Name/Title
```

## Button Specific
```
0x0A: Midi Type
    0x00: Continuous Controller
    0x01: NRPN
    0x02: Note
    0x03: Program Change
    0x04: Song Position

0x0C: Type
    0x00: Momentary
    0x01: Toggle
    0x02: Step
    0x03: Trigger

0x0D:
    Toggle|Step|Trigger
    0x00: Rise
    0x01: Fall

0x0E: Down|On|From|Trigger Value MSB
0x0F: Down|On|From|Trigger Value LSB

0x10: Up|Off|To Value MSB
0x11: Up|Off|To Value LSB

0x12: Step Value MSB    Signed 7 Bit with 0x4000 === 0
0x13: Step Value LSB    

0x14: 
    Step: Wrap Enable
        0x00: Off
        0x01: On

0x15: Pair
    Step: Paired 
        ** Note, Pairs have to be aligned mod(2), Eg Button 0 and 1, or 2 and 3. Never 1 and 2 

0x16: Channel Number
    0x00: Channel 1
    ...
    0x0F: Channel 16
    0x7F: Default (-1)

0x17:
    Note: Note Number
    CC: Bit Depth
    NRPN: Bit Depth
        0x00: 7 bits
        0x01: 8 bits scaled
        0x02: 14 bits
0x18:
    CC: CC Number 
    NRPN: NRPN MSBB

0x19: 
    NRPN: NRPN LSB
```